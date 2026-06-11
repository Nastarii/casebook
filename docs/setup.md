# Configuracao do Projeto

Este guia prepara um ambiente local para desenvolver o Casebook, mantendo a base simples: frontend em React/Vite, backend em FastAPI e servicos de apoio via Docker Compose.

## Pre-requisitos

- Node.js 22 ou superior.
- npm 10 ou superior.
- Python 3.12 ou superior.
- Docker e Docker Compose.
- Git.

## 1. Clonar o repositorio

```bash
git clone <url-do-repositorio>
cd casebook
```

## 2. Instalar dependencias do frontend

As dependencias JavaScript usam npm workspaces a partir da raiz do projeto.

```bash
npm install
```

Comandos principais:

```bash
npm run dev:frontend
npm run lint:frontend
npm run test:frontend
npm run build:frontend
```

O servidor Vite fica disponivel, por padrao, em `http://localhost:5173`.

## 3. Preparar o backend

Entre na pasta da API e crie um ambiente virtual Python.

```bash
cd apps/backend
python -m venv .venv
```

Ative o ambiente virtual.

Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

macOS ou Linux:

```bash
source .venv/bin/activate
```

Instale o backend com dependencias de desenvolvimento.

```bash
pip install -e ".[dev]"
```

## 4. Configurar variaveis de ambiente

O backend le variaveis a partir de `apps/backend/.env`. Crie o arquivo com os valores locais:

```env
APP_NAME=Casebook API
APP_VERSION=0.1.0
DATABASE_URL=postgresql+psycopg://casebook:casebook@localhost:5432/casebook
JWT_SECRET_KEY=change-me-local
JWT_ALGORITHM=HS256
S3_ENDPOINT_URL=http://localhost:9000
S3_BUCKET_NAME=casebook
```

Use uma chave JWT forte fora do ambiente local.

## 5. Subir servicos de infraestrutura

PostgreSQL e MinIO estao definidos em `infrastructure/docker-compose.yml`.

A partir da raiz do projeto:

```bash
docker compose -f infrastructure/docker-compose.yml up -d
```

Servicos locais:

- PostgreSQL: `localhost:5432`
- MinIO API: `http://localhost:9000`
- MinIO Console: `http://localhost:9001`

Credenciais locais do MinIO:

- Usuario: `casebook`
- Senha: `casebook-secret`

## 6. Executar a API

Com o ambiente virtual ativo, execute dentro de `apps/backend`:

```bash
uvicorn app.main:app --reload
```

A API fica disponivel em `http://localhost:8000`.

Verificacao rapida:

```bash
curl http://localhost:8000/api/v1/health
```

## 7. Executar o frontend

Em outro terminal, a partir da raiz:

```bash
npm run dev:frontend
```

Abra `http://localhost:5173` no navegador.

## 8. Rodar verificacoes de qualidade

Frontend, a partir da raiz:

```bash
npm run lint:frontend
npm run test:frontend
npm run build:frontend
```

Backend, dentro de `apps/backend` com o ambiente virtual ativo:

```bash
ruff check .
mypy app
pytest
```

## 9. Encerrar servicos locais

A partir da raiz:

```bash
docker compose -f infrastructure/docker-compose.yml down
```

Para remover tambem os volumes locais de PostgreSQL e MinIO:

```bash
docker compose -f infrastructure/docker-compose.yml down -v
```

## Solucao de problemas

- Se o frontend nao iniciar, confirme que `npm install` foi executado na raiz.
- Se a API nao encontrar o pacote `app`, confirme que o comando foi executado dentro de `apps/backend`.
- Se o PostgreSQL nao conectar, confirme que o Docker Compose esta ativo e que a porta `5432` esta livre.
- Se o PowerShell bloquear a ativacao do ambiente virtual, ajuste a politica local de execucao antes de rodar `Activate.ps1`.

