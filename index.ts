import { randomBytes } from "node:crypto";
import { Output, Services } from "~templates-utils";
import { Input } from "./meta";

export function generate(input: Input): Output {
  const services: Services = [];

  // Cryptographically secure secret, generated once per template installation.
  // It is stored in the service environment and survives normal redeploys.
  const mcpAccessToken = randomBytes(32).toString("hex");

  services.push({
    type: "app",
    data: {
      serviceName: input.serviceName,
      source: {
        type: "github",
        owner: "jaison",
        repo: "github-projects-bridge",
        ref: "main",
        path: "/",
        autoDeploy: true,
      },
      build: {
        type: "dockerfile",
        file: "Dockerfile",
      },
      env: [
        `GITHUB_TOKEN=${input.githubToken}`,
        `MCP_ACCESS_TOKEN=${mcpAccessToken}`,
        `GITHUB_OWNER=${input.githubOwner}`,
        "PORT=80",
      ].join("\n"),
      domains: [
        {
          host: "$(EASYPANEL_DOMAIN)",
          port: 80,
        },
      ],
      mounts: [],
    },
  });

  return { services };
}
