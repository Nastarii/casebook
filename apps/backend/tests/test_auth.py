from collections.abc import Generator

from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, create_engine, select
from sqlmodel.pool import StaticPool

from app.core.database import get_session
from app.core.settings import settings
from app.main import create_app
from app.models.email_confirmation import EmailConfirmationToken


def build_client() -> tuple[TestClient, Session]:
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    SQLModel.metadata.create_all(engine)
    session = Session(engine)
    app = create_app()

    def override_session() -> Generator[Session, None, None]:
        yield session

    app.dependency_overrides[get_session] = override_session
    return TestClient(app), session


def test_register_without_smtp_returns_access_token() -> None:
    settings.smtp_host = None
    client, _ = build_client()

    response = client.post(
        "/api/v1/auth/register",
        json={"name": "Ada Lovelace", "email": "ada@example.com", "password": "strong-pass"},
    )

    body = response.json()
    assert response.status_code == 201
    assert body["access_token"]
    assert body["email_confirmation_required"] is False
    assert body["user"]["is_email_verified"] is True


def test_register_with_smtp_requires_email_confirmation(monkeypatch) -> None:
    settings.smtp_host = "smtp.example.com"
    sent_tokens: list[str] = []

    def fake_send_email_confirmation(_user, token: str) -> None:
        sent_tokens.append(token)

    monkeypatch.setattr("app.services.auth.send_email_confirmation", fake_send_email_confirmation)
    client, session = build_client()

    register_response = client.post(
        "/api/v1/auth/register",
        json={"name": "Grace Hopper", "email": "grace@example.com", "password": "strong-pass"},
    )

    assert register_response.status_code == 201
    assert register_response.json()["access_token"] is None
    assert register_response.json()["email_confirmation_required"] is True
    assert sent_tokens
    assert session.exec(select(EmailConfirmationToken)).first() is not None

    login_response = client.post(
        "/api/v1/auth/login",
        json={"email": "grace@example.com", "password": "strong-pass"},
    )
    assert login_response.status_code == 403

    confirm_response = client.post("/api/v1/auth/confirm-email", json={"token": sent_tokens[0]})
    assert confirm_response.status_code == 200
    assert confirm_response.json()["is_email_verified"] is True

    login_after_confirmation = client.post(
        "/api/v1/auth/login",
        json={"email": "grace@example.com", "password": "strong-pass"},
    )
    assert login_after_confirmation.status_code == 200
    assert login_after_confirmation.json()["access_token"]

    settings.smtp_host = None
