import type { NodePointer } from "@nexus-archive/types";
import type Fastify from "fastify";

const nodeApi = (fastify: Fastify.FastifyInstance) => {
  // TODO: Replace with a real database
  const nodes = new Map<string, NodePointer>();

  nodes.set("node-1", {
    id: "node-1",
    isEntryPoint: true,
    address:
      "https://raw.githubusercontent.com/dvtzoe/fictional-chainsaw/refs/heads/main/chapters/chap1.mdx",
  });

  nodes.set("node-2", {
    id: "node-2",
    isEntryPoint: false,
    address:
      "https://raw.githubusercontent.com/dvtzoe/fictional-chainsaw/refs/heads/main/chapters/the-epic-chapter.mdx",
  });

  // Simple API
  fastify.get("/api/node/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const node = nodes.get(id);
    if (node) {
      return node;
    } else {
      reply.status(404).send({ error: "Node not found" });
    }
  });
};

export default nodeApi;
