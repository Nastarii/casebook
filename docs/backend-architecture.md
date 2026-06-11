# Backend Architecture

O backend preserva conhecimento com contratos claros e domínio explícito.

## Camadas

- `api/`: endpoints versionados em `/api/v1`.
- `services/`: regras de aplicação e orquestração de casos de uso.
- `repositories/`: persistência e consultas.
- `models/`: entidades SQLModel persistidas.
- `schemas/`: DTOs de entrada e saída.
- `core/`: configuração, segurança e dependências transversais.

## Diretriz

A prioridade máxima é preservar a integridade do conhecimento armazenado. Endpoints futuros devem validar entrada, retornar schemas tipados e evitar payloads excessivos.
