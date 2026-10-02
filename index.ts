import { Output, Services, randomString } from "~templates-utils";
import { Input } from "./meta";

export function generate(input: Input): Output {
  const services: Services = [];

  // Generated once while the template is instantiated. It is stored in the
  // service environment, so normal container restarts/redeploys keep it stable.
  const mcpAccessToken = randomString(64);

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
        "PORT=3000",
      ].join("\n"),
      domains: [
        {
          host: "$(EASYPANEL_DOMAIN)",
          port: 3000,
        },
      ],
      mounts: [],
    },
  });

  return { services };
}
