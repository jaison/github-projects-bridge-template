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
| GitHub Personal Access Token (classic) | Token clássico com o escopo `project` (**Full control of projects**). |

O template gera automaticamente o segredo de acesso MCP; não é necessário informar esse valor durante a instalação.

## Como gerar o token do GitHub

Para gerenciar Projects V2 pertencentes a uma conta pessoal do GitHub, utilize um **Personal Access Token (classic)**. Atualmente, os fine-grained personal access tokens não conseguem acessar Projects pertencentes a uma conta pessoal.

1. Acesse [Configurações de tokens do GitHub — Tokens (classic)](https://github.com/settings/tokens).
2. Selecione **Generate new token (classic)**.
3. Informe um nome descritivo, por exemplo `GitHub Projects Bridge`.
4. Em **Select scopes**, marque `project` — **Full control of projects**. O GitHub também marcará `read:project` automaticamente; isso é esperado.
5. Gere o token e copie-o. O GitHub exibe o valor apenas uma vez.

Não marque o escopo `repo` apenas para administrar quadros de projetos. O escopo clássico `project` é a permissão necessária para as operações do servidor.

> **Projetos de organizações:** se o quadro pertencer a uma organização, ela poderá restringir o uso de tokens clássicos. Verifique a política de tokens e eventuais exigências de aprovação da organização. Tokens fine-grained oferecem a permissão **Projects** para organizações, mas atualmente não atendem Projects pertencentes a contas pessoais.

O token é disponibilizado à aplicação pela variável `GITHUB_TOKEN`. O proprietário informado na instalação é configurado em `GITHUB_OWNER`.

## Variáveis de ambiente geradas

A aplicação é configurada com as seguintes variáveis:

| Variável | Finalidade |
| --- | --- |
| `GITHUB_TOKEN` | Personal Access Token (classic) informado durante a instalação, com o escopo `project`. |
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
