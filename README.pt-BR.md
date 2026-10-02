# GitHub Projects Bridge — Template para Easypanel

[🇺🇸 English](README.md) | [🇧🇷 Português (Brasil)](README.pt-BR.md)

Template do Easypanel para instalar o [GitHub Projects Bridge](https://github.com/jaison/github-projects-bridge), servidor MCP remoto para gerenciamento de GitHub Projects V2.

## O que o template cria

O template cria uma aplicação no Easypanel a partir do repositório `jaison/github-projects-bridge` (branch `main`), utiliza o Dockerfile da raiz, expõe a porta interna `80` e gera um `MCP_ACCESS_TOKEN` exclusivo para a instalação (32 bytes aleatórios criptograficamente seguros).

## Dados solicitados na instalação

| Campo | Descrição |
| --- | --- |
| Service Name | Nome da aplicação no Easypanel. |
| GitHub User or Organization | Login do usuário ou organização proprietária do Projects V2. |
| GitHub Personal Access Token (classic) | Token clássico com o escopo `project` (**Full control of projects**). |

## Como gerar o token do GitHub

Para quadros Projects V2 pertencentes a uma **conta pessoal do GitHub**, utilize um **Personal Access Token (classic)**. Atualmente, tokens fine-grained não conseguem acessar Projects pertencentes a uma conta de usuário.

1. Acesse [Configurações de tokens do GitHub — Tokens (classic)](https://github.com/settings/tokens).
2. Selecione **Generate new token (classic)**.
3. Informe um nome, por exemplo `GitHub Projects Bridge`.
4. Em **Select scopes**, marque `project` — **Full control of projects**. O GitHub também marcará `read:project` automaticamente; isso é esperado.
5. Gere o token e copie-o. O GitHub exibe o valor apenas uma vez.

Não marque o escopo `repo` apenas para administrar quadros de projetos.

Para Projects V2 pertencentes a **organizações**, tokens fine-grained oferecem a permissão **Projects** no nível da organização. A política de tokens e as exigências de aprovação da organização podem se aplicar. A organização também pode restringir o uso de tokens clássicos.

## Variáveis de ambiente geradas

| Variável | Finalidade |
| --- | --- |
| `GITHUB_TOKEN` | Personal Access Token (classic) com o escopo `project`. |
| `MCP_ACCESS_TOKEN` | Segredo aleatório de autenticação MCP, exclusivo da instalação. |
| `GITHUB_OWNER` | Usuário ou organização proprietária dos projetos. |
| `PORT` | Porta interna da aplicação (`80`). |

Mantenha os dois tokens em sigilo. Os clientes MCP devem enviar o `MCP_ACCESS_TOKEN` gerado como token Bearer.

## Arquivos do template

- `meta.yaml`: metadados, instruções e campos solicitados na instalação.
- `index.ts`: configuração do serviço Easypanel e geração do segredo exclusivo da instalação.

## Projeto relacionado

- [GitHub Projects Bridge — Servidor MCP](https://github.com/jaison/github-projects-bridge)

## Publicação no catálogo público do Easypanel

Para propor este template ao catálogo oficial, copie `meta.yaml` e `index.ts` para `templates/github-projects-bridge/` no repositório `easypanel-io/templates` e envie um pull request. A publicação depende da revisão dos mantenedores do Easypanel.

## Licença

Este repositório ainda não possui uma licença definida.
