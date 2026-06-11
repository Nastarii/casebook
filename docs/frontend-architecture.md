# Frontend Architecture

O frontend do Casebook e uma experiencia de leitura antes de ser uma aplicacao de controle.

## Camadas

- `features/`: reune fluxos de produto, como biblioteca, leitor, editor e assets.
- `components/`: abriga elementos reutilizaveis sem regra de negocio.
- `layouts/`: define estruturas de leitura, navegacao e apresentacao.
- `pages/`: conecta rotas do React Router aos fluxos visiveis.
- `hooks/`: concentra logica reaproveitavel de React.
- `services/`: isola chamadas HTTP e adapters.
- `stores/`: guarda estado local com Zustand.

## Diretriz visual

Toda tela deve responder: isso faz o projeto parecer mais um livro digital?

Se a resposta for negativa, a solucao deve ser simplificada ou redesenhada.

## Leitor de projeto

O primeiro fluxo de produto e o leitor em `/projects/:projectSlug/read`.

Ele apresenta um projeto como livro digital: indice lateral, capitulos, paginas, pagina atual,
tempo de leitura e navegacao sequencial. A decisao prioriza leitura e preservacao de contexto
antes de telas administrativas.

Nesta fase, o conteudo exemplar vive em `src/data/sampleProject.ts` para validar a experiencia
editorial e a hierarquia visual. Quando os endpoints de projetos, capitulos e paginas estiverem
prontos, essa camada deve ser substituida por um adapter em `services/`, mantendo a pagina do
leitor focada apenas na composicao da experiencia.
