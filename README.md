# GitHub Projects Bridge — Easypanel Template

Template de instalação do servidor MCP GitHub Projects Bridge no Easypanel.

## Arquivos

- `meta.yaml`: informações e campos apresentados durante a instalação.
- `index.ts`: gera a configuração do serviço Easypanel.

## Dados solicitados

- **GitHub User or Organization:** proprietário dos Projects V2.
- **GitHub Fine-grained Personal Access Token:** token com permissão `Projects: Read and write`.

O template gera um `MCP_ACCESS_TOKEN` criptograficamente aleatório de 256 bits durante a criação da instalação. O segredo é gravado nas variáveis do serviço e não muda em reinicializações ou redeploys normais.

O serviço é criado a partir do repositório `jaison/github-projects-bridge`, branch `main`, usando o Dockerfile e a porta interna `3000`.

## Publicação no catálogo público do Easypanel

Este repositório mantém a definição do template separada do código do servidor. Para disponibilizá-lo no catálogo público oficial, os arquivos `meta.yaml` e `index.ts` devem ser copiados para `templates/github-projects-bridge/` no repositório `easypanel-io/templates` e submetidos por Pull Request.

A estrutura segue o padrão dos templates oficiais. A aceitação e publicação no catálogo dependem da revisão dos mantenedores do Easypanel.
