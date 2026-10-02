# GitHub Projects Bridge — Template para Easypanel

<p align="center">
  <img src="assets/logo.svg" alt="GitHub Projects Bridge" width="180">
</p>

[🇺🇸 English](README.md) | [🇧🇷 Português (Brasil)](README.pt-BR.md)

Template do Easypanel para instalar o [GitHub Projects Bridge](https://github.com/jaison/github-projects-bridge), servidor MCP remoto para gerenciamento de GitHub Projects V2.

## O que o template cria

O template cria uma aplicação no Easypanel a partir do repositório `jaison/github-projects-bridge` (branch `main`), utiliza o Dockerfile da raiz, expõe a porta interna `80`, configura OAuth 2.1 + PKCE, gera um segredo exclusivo para assinatura dos tokens e monta um volume persistente em `/data`.

A URL pública do serviço é derivada automaticamente da variável `EASYPANEL_DOMAIN` do Easypanel.

## Dados solicitados na instalação

| Campo | Descrição |
| --- | --- |
| Service Name | Nome da aplicação no Easypanel. |
| GitHub User or Organization | Login do usuário ou organização proprietária do Projects V2. |
| GitHub Personal Access Token (classic) | Token clássico com o escopo `project` (**Full control of projects**). |
| GitHub OAuth App Client ID | Client ID do OAuth App usado pelo bridge para autenticar os usuários permitidos. |
| GitHub OAuth App Client Secret | Client Secret do OAuth App. |
| Allowed GitHub Users | Logins GitHub permitidos a usar o bridge, separados por vírgula, por exemplo `jaison`. |

## Antes de fazer o deploy

Crie um **GitHub OAuth App** em [Developer Settings](https://github.com/settings/developers).

Use o domínio do Easypanel como URL pública HTTPS. O **Redirect URI** do OAuth App deve ser:

```
https://SEU-DOMINIO-EASYPANEL/oauth/github/callback
```

O template configura automaticamente:

- `PUBLIC_URL=https://$(EASYPANEL_DOMAIN)`
- `OAUTH_DATA_FILE=/data/oauth-state.json`
- `OAUTH_SIGNING_SECRET` com um segredo criptograficamente aleatório gerado durante a criação do template.

O bridge usa o GitHub OAuth App apenas para autenticação dos usuários. As chamadas à API de GitHub Projects continuam usando o `GITHUB_TOKEN` armazenado no servidor.

## Como gerar o token do GitHub

Para quadros Projects V2 pertencentes a uma **conta pessoal do GitHub**, utilize um **Personal Access Token (classic)**. Atualmente, tokens fine-grained não conseguem acessar Projects pertencentes a uma conta de usuário.

1. Acesse [Configurações de tokens do GitHub — Tokens (classic)](https://github.com/settings/tokens).
2. Selecione **Generate new token (classic)**.
3. Informe um nome, por exemplo `GitHub Projects Bridge`.
4. Em **Select scopes**, marque `project` — **Full control of projects**. O GitHub também marcará `read:project` automaticamente; isso é esperado.
5. Gere o token e copie-o. O GitHub exibe o valor apenas uma vez.

Não marque o escopo `repo` apenas para administrar quadros de projetos.

Para Projects V2 pertencentes a **organizações**, tokens fine-grained oferecem a permissão **Projects** no nível da organização. A política de tokens e as exigências de aprovação da organização podem se aplicar. A organização também pode restringir o uso de tokens clássicos.

## Variáveis de ambiente

| Variável | Finalidade |
| --- | --- |
| `GITHUB_TOKEN` | Token do GitHub usado nas operações GraphQL de Projects V2. |
| `GITHUB_OWNER` | Usuário ou organização proprietária dos projetos. |
| `PUBLIC_URL` | URL pública HTTPS derivada do domínio do Easypanel. |
| `GITHUB_OAUTH_CLIENT_ID` | Client ID do GitHub OAuth App. |
| `GITHUB_OAUTH_CLIENT_SECRET` | Client Secret do GitHub OAuth App. |
| `OAUTH_ALLOWED_GITHUB_USERS` | Logins GitHub autorizados a utilizar o bridge. |
| `OAUTH_SIGNING_SECRET` | Segredo aleatório gerado pelo template para assinar os tokens do bridge. |
| `OAUTH_DATA_FILE` | Caminho persistente do estado OAuth: `/data/oauth-state.json`. |
| `PORT` | Porta interna da aplicação (`80`). |

O `MCP_ACCESS_TOKEN` não é mais utilizado. Os clientes MCP autenticam pelo fluxo OAuth 2.1 + PKCE do bridge.

## Escopos OAuth

O bridge anuncia e solicita juntos os seguintes escopos de Projects:

- `projects:read`
- `projects:write`

Assim, a conexão do ChatGPT pode autorizar operações de leitura e escrita do projeto em um único consentimento.

## Persistência

O estado OAuth inclui clientes registrados, códigos de autorização e refresh tokens armazenados apenas em forma de hash. O template monta um volume persistente em `/data`, permitindo que esse estado sobreviva aos redeploys normais do serviço.

A implementação assume uma única instância do serviço. Não execute múltiplas réplicas independentes compartilhando o mesmo arquivo JSON.

## Arquivos do template

- `meta.yaml`: metadados, instruções e campos solicitados na instalação.
- `index.ts`: configuração do serviço Easypanel, geração de variáveis, criação do segredo OAuth e configuração do volume persistente.

## Projeto relacionado

- [GitHub Projects Bridge — Servidor MCP](https://github.com/jaison/github-projects-bridge)

## Publicação no catálogo público do Easypanel

Para propor este template ao catálogo oficial, copie `meta.yaml` e `index.ts` para `templates/github-projects-bridge/` no repositório `easypanel-io/templates` e envie um pull request. A publicação depende da revisão dos mantenedores do Easypanel.

## Licença

Este repositório ainda não possui uma licença definida.
