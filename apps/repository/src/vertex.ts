import { prisma } from "@nexus-archive/repo-db";
import type { FastifyInstance } from "fastify";

const vertexGet = (fastify: FastifyInstance) => {
  fastify.get("/v1/vertex/:slug", async (request, reply) => {
    const { slug } = request.params as { slug: string };
    const [owner, name] = slug.split("/");

    const vertex = await prisma.vertex.findUnique({
      where: {
        slug: {
          owner,
          name,
        },
      },
    });
    if (vertex) {
      return vertex;
    } else {
      reply.status(404).send({ error: "Vertex not found" });
      return;
    }
  });
};

export default vertexGet;
