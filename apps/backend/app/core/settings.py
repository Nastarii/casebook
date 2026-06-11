from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Casebook API"
    app_version: str = "0.1.0"
    database_url: str = "postgresql+psycopg://casebook:casebook@localhost:5432/casebook"
    jwt_secret_key: str = "change-me"
    jwt_algorithm: str = "HS256"
    s3_endpoint_url: str = "http://localhost:9000"
    s3_bucket_name: str = "casebook"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Settings()
