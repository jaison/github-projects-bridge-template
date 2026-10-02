# GitHub Projects Bridge — Easypanel Template

[🇺🇸 English](README.md) | [🇧🇷 Português (Brasil)](README.pt-BR.md)

An Easypanel template for deploying [GitHub Projects Bridge](https://github.com/jaison/github-projects-bridge), a remote MCP server for GitHub Projects V2.

## What it creates

The template creates an Easypanel application from `jaison/github-projects-bridge` (branch `main`), builds its root Dockerfile, exposes internal port `80`, and generates a unique `MCP_ACCESS_TOKEN` (32 cryptographically random bytes) for the installation.

## Installation inputs

| Field | Description |
| --- | --- |
| Service Name | Easypanel application name. |
| GitHub User or Organization | Login that owns the Projects V2 board. |
| GitHub Personal Access Token (classic) | Classic token with the `project` scope (**Full control of projects**). |

## Create the GitHub token

For Projects V2 boards owned by a **personal GitHub account**, use a **Personal Access Token (classic)**. Fine-grained personal access tokens currently cannot access Projects owned by a user account.

1. Open [GitHub token settings — Tokens (classic)](https://github.com/settings/tokens).
2. Select **Generate new token (classic)**.
3. Name it, for example `GitHub Projects Bridge`.
4. Under **Select scopes**, enable `project` — **Full control of projects**. GitHub will also select `read:project`; this is expected.
5. Generate the token and copy it. GitHub displays it only once.

Do not add the `repo` scope for project-board operations alone.

For **organization-owned** Projects V2, fine-grained tokens support the organization-level **Projects** permission. Organization token policies and approval requirements may apply. Classic token access may also be restricted by the organization.

## Generated environment

| Variable | Purpose |
| --- | --- |
| `GITHUB_TOKEN` | GitHub Personal Access Token (classic) with the `project` scope. |
| `MCP_ACCESS_TOKEN` | Random, per-installation MCP authentication secret. |
| `GITHUB_OWNER` | GitHub user or organization that owns the projects. |
| `PORT` | Internal application port (`80`). |

Keep both tokens private. MCP clients must send the generated `MCP_ACCESS_TOKEN` as a Bearer token.

## Template files

- `meta.yaml`: template metadata, instructions, and installation input schema.
- `index.ts`: Easypanel service configuration and per-installation secret generation.

## Related project

- [GitHub Projects Bridge — MCP server](https://github.com/jaison/github-projects-bridge)

## Publishing to the Easypanel public catalog

To propose this template for the official catalog, copy `meta.yaml` and `index.ts` into `templates/github-projects-bridge/` in `easypanel-io/templates` and submit a pull request. Publication depends on review by Easypanel maintainers.

## License

No license has been specified for this repository yet.
