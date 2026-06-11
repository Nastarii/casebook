# CASEBOOK - BOOTSTRAP INICIAL

Você é o arquiteto principal do projeto Casebook.

Antes de implementar funcionalidades, sua missão é construir uma fundação sólida, escalável e alinhada à visão do produto.

---

# Visão do Produto

Casebook é uma plataforma que transforma projetos em livros digitais interativos.

O objetivo não é gerenciar tarefas.

O objetivo é documentar, organizar e apresentar conhecimento através de experiências narrativas visuais.

Cada projeto deve parecer um livro digital vivo.

Referências de experiência:

* Medium
* Apple Product Stories
* Arc Browser
* Linear
* Notion Sites

Evite qualquer padrão visual que remeta a:

* Jira
* Trello
* Asana
* ClickUp
* Sistemas administrativos tradicionais

---

# Stack Tecnológica

Frontend

* React
* TypeScript
* Vite
* React Router
* Zustand
* React Query
* TailwindCSS
* Framer Motion
* TipTap

Backend

* Python
* FastAPI
* PostgreSQL
* SQLModel
* Alembic
* JWT

Storage

* MinIO
* AWS S3 Compatible

Infraestrutura

* Docker Compose
* Nginx

---

# Objetivo da Tarefa

Crie a estrutura inicial completa do projeto.

Não implemente funcionalidades de negócio ainda.

Primeiro construa a fundação arquitetural.

---

# Etapa 1 - Estrutura do Repositório

Crie uma estrutura organizada para crescimento de longo prazo.

Exemplo esperado:

/casebook

/apps
/frontend
/backend

/packages
/ui
/types
/shared

/docs

/agents

/infrastructure

/scripts

---

# Etapa 2 - Sistema de Agentes

Crie os seguintes arquivos:

/agents

AGENTS.md

frontend.md
backend.md
test.md
review.md
docs.md

Cada agente deve possuir:

* missão
* responsabilidades
* limites
* critérios de qualidade
* formato de resposta

O Review Agent deve ser o guardião da visão do produto.

---

# Etapa 3 - Domínio Inicial

Defina os principais modelos de domínio.

Projeto

Capítulo

Página

Bloco

Asset

Template

Usuário

Não implemente lógica complexa.

Apenas modelagem inicial.

---

# Etapa 4 - Arquitetura Frontend

Defina uma arquitetura baseada em:

features/
components/
layouts/
pages/
hooks/
services/
stores/

Criar documentação justificando cada camada.

---

# Etapa 5 - Arquitetura Backend

Defina uma arquitetura baseada em:

api/
services/
repositories/
models/
schemas/
core/

Criar documentação justificando cada camada.

---

# Etapa 6 - Sistema de Design

Criar a fundação de design.

Definir:

* tipografia
* espaçamento
* grid
* tokens
* temas
* sombras
* animações

Objetivo:

transmitir sensação de leitura premium.

Não criar componentes ainda.

Criar apenas a fundação.

---

# Etapa 7 - Documentação

Criar:

README.md

ARCHITECTURE.md

PRODUCT_VISION.md

DOMAIN_MODEL.md

CONTRIBUTING.md

ROADMAP.md

ADRs/

---

# Etapa 8 - Qualidade

Configurar:

Frontend

* ESLint
* Prettier
* Vitest

Backend

* Ruff
* Pytest
* Mypy

CI

* GitHub Actions

---

# Restrições

Não criar código desnecessário.

Não criar telas administrativas.

Não criar CRUDs completos.

Não criar funcionalidades além da fundação.

Priorizar:

* arquitetura
* clareza
* escalabilidade
* experiência do desenvolvedor

---

# Entrega Esperada

Ao final:

1. Mostrar a estrutura completa de diretórios.
2. Explicar decisões arquiteturais.
3. Listar riscos identificados.
4. Listar próximos passos recomendados.
5. Indicar quais partes devem ser implementadas primeiro no MVP.

A qualidade da arquitetura é mais importante do que a quantidade de código.
