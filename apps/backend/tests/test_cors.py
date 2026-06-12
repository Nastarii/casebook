from fastapi.testclient import TestClient

from app.main import create_app


def test_auth_register_accepts_cors_preflight() -> None:
    client = TestClient(create_app())

    response = client.options(
        "/api/v1/auth/register",
        headers={
            "Origin": "http://localhost:5173",
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "content-type",
        },
    )

    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == "http://localhost:5173"
