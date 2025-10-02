import { prisma } from "@nexus-archive/repo-db";
import type * as Fastify from "fastify";

const vertexGet = (fastify: Fastify.FastifyInstance) => {
  fastify.get("/v1/vertex/:owner/:name", async (request, reply) => {
    const { owner, name } = request.params as { owner: string; name: string };

    const node = await prisma.vertex.findUnique({
      where: {
        slug: {
          owner,
          name,
        },
      },
    });
    if (node) {
      return node;
    } else {
      reply.status(404).send({ error: "Node not found" });
      return;
    }
  });
};

export default vertexGet;
