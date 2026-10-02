# GitHub Projects Bridge — Template para Easypanel

[🇺🇸 English](README.md) | [🇧🇷 Português (Brasil)](README.pt-BR.md)

Um template do Easypanel para instalar o [GitHub Projects Bridge](https://github.com/jaison/github-projects-bridge), um servidor MCP remoto que gerencia projetos GitHub Projects V2 por meio da API GraphQL do GitHub.

Este repositório contém a definição do template. A implementação do servidor MCP está no repositório do projeto principal.

## O que o template cria

Ao instalar o template, é criada uma aplicação no Easypanel que:

- Utiliza o repositório `jaison/github-projects-bridge`, a branch `main` e o Dockerfile localizado na raiz.
- Compila e executa a aplicação na porta interna `3000`.
- Configura o domínio do serviço para encaminhar as requisições à porta `3000`.
- Habilita o deploy automático a partir da origem GitHub configurada.
- Gera um `MCP_ACCESS_TOKEN` exclusivo para cada instalação.

O segredo de acesso é gerado com bytes aleatórios criptograficamente seguros do Node.js (32 bytes / 256 bits), armazenado nas variáveis de ambiente do serviço e preservado em reinicializações e redeploys normais.

## Dados solicitados na instalação

| Campo | Descrição |
| --- | --- |
| Service Name | Nome atribuído à aplicação no Easypanel. O padrão é `github-projects-bridge`. |
| GitHub User or Organization | Login do usuário ou da organização proprietária dos projetos Projects V2 que serão gerenciados. |
| GitHub Fine-grained Personal Access Token | Token de acesso pessoal granular com a permissão `Projects` configurada como **Read and write**. |

O template gera automaticamente o segredo de acesso MCP; não é necessário informar esse valor durante a instalação.

## Permissões do token GitHub

Crie um Fine-grained Personal Access Token e conceda a permissão **Projects** necessária para acessar os Projects V2 do usuário ou da organização, com acesso definido como **Read and write**.

O token é disponibilizado à aplicação pela variável `GITHUB_TOKEN`. O proprietário informado na instalação é configurado em `GITHUB_OWNER`.

## Variáveis de ambiente geradas

A aplicação é configurada com as seguintes variáveis:

| Variável | Finalidade |
| --- | --- |
| `GITHUB_TOKEN` | Fine-grained Personal Access Token informado durante a instalação. |
| `MCP_ACCESS_TOKEN` | Segredo aleatório e exclusivo da instalação, gerado pelo template. |
| `GITHUB_OWNER` | Usuário ou organização do GitHub proprietária dos projetos. |
| `PORT` | Porta interna da aplicação (`3000`). |

Mantenha os tokens em sigilo. Os clientes que se conectarem ao endpoint MCP devem utilizar o `MCP_ACCESS_TOKEN` gerado como token Bearer.

## Arquivos do template

- `meta.yaml`: metadados do template, instruções de instalação, benefícios, recursos e definição dos campos solicitados.
- `index.ts`: gera a configuração da aplicação no Easypanel e o segredo de acesso exclusivo da instalação.

## Projeto relacionado

- [GitHub Projects Bridge — Servidor MCP](https://github.com/jaison/github-projects-bridge)

## Publicação no catálogo público do Easypanel

Este repositório mantém a definição do template separada do servidor MCP. Para propor sua inclusão no catálogo oficial do Easypanel, copie os arquivos `meta.yaml` e `index.ts` para `templates/github-projects-bridge/` no repositório `easypanel-io/templates` e envie um pull request.

O template segue a estrutura utilizada pelo catálogo, mas sua aceitação e publicação dependem da revisão dos mantenedores do Easypanel.

## Licença

Este repositório ainda não possui uma licença definida.
