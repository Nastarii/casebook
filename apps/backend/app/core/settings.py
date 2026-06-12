from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Casebook API"
    app_version: str = "0.1.0"
    database_url: str = "postgresql+psycopg://casebook:casebook@localhost:5432/casebook"
    jwt_secret_key: str = "change-me"
    jwt_algorithm: str = "HS256"
    jwt_access_token_expire_minutes: int = 60
    s3_endpoint_url: str = "http://localhost:9000"
    s3_bucket_name: str = "casebook"
    smtp_host: str | None = None
    smtp_port: int = 587
    smtp_username: str | None = None
    smtp_password: str | None = None
    smtp_from_email: str | None = None
    smtp_use_tls: bool = True
    email_confirmation_token_expire_hours: int = 24

    @property
    def email_confirmation_required(self) -> bool:
        return bool(self.smtp_host)

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
