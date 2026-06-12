import smtplib
from email.message import EmailMessage

from app.core.settings import settings
from app.models.user import User


class EmailDeliveryError(RuntimeError):
    pass


def send_email_confirmation(user: User, token: str) -> None:
    if not settings.email_confirmation_required:
        return

    smtp_host = settings.smtp_host
    from_email = settings.smtp_from_email or settings.smtp_username
    if smtp_host is None or from_email is None:
        raise EmailDeliveryError("SMTP sender is not configured")

    message = EmailMessage()
    message["Subject"] = "Confirme seu acesso ao Casebook"
    message["From"] = from_email
    message["To"] = user.email
    message.set_content(
        "\n".join(
            [
                f"Ola, {user.name}.",
                "",
                "Use o token abaixo para confirmar seu email no Casebook:",
                token,
                "",
                "Se voce nao criou esta conta, ignore esta mensagem.",
            ],
        ),
    )

    try:
        with smtplib.SMTP(smtp_host, settings.smtp_port, timeout=10) as smtp:
            if settings.smtp_use_tls:
                smtp.starttls()
            if settings.smtp_username and settings.smtp_password:
                smtp.login(settings.smtp_username, settings.smtp_password)
            smtp.send_message(message)
    except OSError as exc:
        raise EmailDeliveryError("Unable to send confirmation email") from exc
