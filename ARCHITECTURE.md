# Architecture

Casebook é organizado como um monorepo simples, preparado para separar experiência, domínio e infraestrutura sem antecipar complexidade.

## Camadas

### Frontend

O app web vive em `apps/frontend` e segue uma arquitetura orientada por experiência:

- `features/`: fluxos de produto com significado narrativo.
- `components/`: peças reutilizáveis de interface.
- `layouts/`: composições de leitura, navegação e apresentação.
- `pages/`: rotas visíveis da aplicação.
- `hooks/`: lógica reutilizável de React.
- `services/`: comunicação com APIs e adapters externos.
- `stores/`: estado client-side com Zustand.

### Backend

O serviço HTTP vive em `apps/backend` e usa FastAPI com domínio explícito:

- `api/`: rotas versionadas.
- `services/`: casos de uso.
- `repositories/`: acesso a dados.
- `models/`: entidades persistidas.
- `schemas/`: contratos de entrada e saída.
- `core/`: configuração, segurança e dependências compartilhadas.

### Packages

- `packages/ui`: futura base de componentes visuais compartilhados.
- `packages/types`: contratos TypeScript compartilhados.
- `packages/shared`: utilitários sem dependência de framework.

## Decisões

- A fundação privilegia modelagem e documentação antes de CRUDs.
- A UI começa com tokens, não componentes, para preservar consistência visual.
- O backend expõe apenas health check nesta etapa para validar a base sem criar funcionalidades prematuras.
