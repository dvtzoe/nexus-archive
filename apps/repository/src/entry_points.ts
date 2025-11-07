import { prisma } from "@nexus-archive/repo-db";
import type * as Fastify from "fastify";

const entryPointsGet = (fastify: Fastify.FastifyInstance) => {
  fastify.get("/v1/entry-points", async () => {
    const entryPoints = await prisma.vertex.findMany({
      where: {
        isEntryPoint: true,
      },
      select: {
        owner: true,
        name: true,
      },
    });
    return entryPoints;
  });
};

export default entryPointsGet;
