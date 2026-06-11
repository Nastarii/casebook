# AGENTS.md

# Casebook

Transformando projetos em livros digitais interativos.

---

# Visão do Produto

Casebook não é um gerenciador de tarefas.

Casebook não é um wiki.

Casebook não é um sistema de documentação tradicional.

O objetivo é transformar projetos em experiências narrativas visualmente elegantes.

Toda decisão de design, arquitetura e implementação deve reforçar os seguintes princípios:

1. Narrative First
2. Reading Experience First
3. Premium Visual Design
4. Simplicity Over Complexity
5. Knowledge Preservation
6. Presentation Before Administration

Sempre priorize:

* clareza
* legibilidade
* estética
* navegação fluida

Evite:

* interfaces corporativas
* excesso de formulários
* telas administrativas complexas
* elementos que lembrem Jira, Trello ou ClickUp

---

# Stack Oficial

## Frontend

* React
* TypeScript
* React Router
* Zustand
* React Query
* TailwindCSS
* Framer Motion
* TipTap

## Backend

* Python
* FastAPI
* PostgreSQL
* SQLModel
* Alembic
* JWT

## Storage

* MinIO
* S3 Compatible Storage

---

# Estrutura de Domínio

Projeto

* Chapters
* Pages
* Blocks
* Assets

Tipos de blocos:

* Text
* Image
* Video
* Code
* Architecture
* Timeline
* Metrics
* Decisions
* Gallery
* References
* Attachments

---

# Regras Gerais

## Arquitetura

* Componentes reutilizáveis.
* Separação clara de responsabilidades.
* Evitar lógica duplicada.
* Evitar dependências desnecessárias.

## Código

* Código autoexplicativo.
* Funções pequenas.
* Tipagem forte.
* Comentários apenas quando necessários.

## UI

Toda interface deve transmitir:

* elegância
* foco
* leitura
* minimalismo

Nunca criar telas visualmente parecidas com painéis administrativos tradicionais.

---

# Fluxo de Trabalho

Backend Agent (agents/backend.md)
↓
Frontend Agent (agents/frontend.md)
↓
Test Agent (agents/test.md)
↓
Review Agent (agents/review.md)
↓
Docs Agent (agents/docs.md)

Nenhuma tarefa é considerada concluída sem passar pelo Review Agent.

---

# Formato Obrigatório de Resposta

status: success | partial | failed

arquivos_alterados:

* arquivo1
* arquivo2

resumo:

* alteração realizada

riscos:

* item opcional

testes:

* testes executados

próximos_passos:

* sugestões
