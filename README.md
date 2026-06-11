# Casebook

Casebook transforma projetos em livros digitais interativos.

O produto nasce para preservar conhecimento e apresentar a evolução de um projeto como uma experiência narrativa, clara e visualmente refinada. Ele não é um gerenciador de tarefas, um wiki corporativo ou uma tela administrativa tradicional.

## Stack

- Frontend: React, TypeScript, Vite, React Router, Zustand, React Query, TailwindCSS, Framer Motion e TipTap.
- Backend: Python, FastAPI, PostgreSQL, SQLModel, Alembic e JWT.
- Storage: MinIO ou outro storage S3 compatible.
- Infraestrutura: Docker Compose e Nginx.

## Estrutura

```text
apps/
  frontend/
  backend/
packages/
  ui/
  types/
  shared/
docs/
  ADRs/
agents/
infrastructure/
scripts/
```

## Configuração local

Consulte `docs/setup.md` para preparar o ambiente de desenvolvimento, subir PostgreSQL e MinIO, executar frontend, backend e verificações de qualidade.

## Princípios

- Narrative First.
- Reading Experience First.
- Premium Visual Design.
- Simplicity Over Complexity.
- Knowledge Preservation.
- Presentation Before Administration.

## Primeira fundação

Esta versão inicial define a arquitetura, os modelos de domínio, a base visual, os padrões de qualidade e a documentação que orientarão o MVP.
