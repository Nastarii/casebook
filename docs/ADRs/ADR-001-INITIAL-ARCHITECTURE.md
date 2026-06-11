# ADR-001: Initial Architecture

## Status

Accepted

## Context

Casebook precisa crescer como uma plataforma de publicação narrativa sem assumir cedo demais a forma de um dashboard administrativo.

## Decision

Adotar um monorepo com `apps`, `packages`, `docs`, `agents`, `infrastructure` e `scripts`. O frontend será organizado por experiência e o backend por domínio e casos de uso.

## Consequences

- A separação entre experiência e domínio fica clara desde o início.
- O projeto pode evoluir para múltiplos apps e pacotes compartilhados.
- A implementação inicial permanece pequena e focada em fundação.
