# GitHub Projects Bridge — Easypanel Template

Template de instalação do servidor MCP GitHub Projects Bridge no Easypanel.

## Instalação

Este repositório contém a definição do template para o catálogo do Easypanel. A estrutura segue o padrão oficial `meta.yaml` + `index.ts` usado em `easypanel-io/templates`.

Na instalação, o usuário informa o proprietário dos Projects V2 e um GitHub fine-grained Personal Access Token com `Projects: Read and write`. O template gera um segredo MCP exclusivo para aquela instalação e configura o serviço para construir o Dockerfile do repositório `jaison/github-projects-bridge`.

## Publicação no catálogo

Para entrar no catálogo público oficial, o conteúdo do diretório `templates/github-projects-bridge/` deve ser submetido ao repositório `easypanel-io/templates` por Pull Request. Manter esta cópia separada permite versionar e desenvolver o template independentemente do código do servidor.
