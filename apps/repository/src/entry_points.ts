import type * as Fastify from "fastify";

const entryPointsApi = (fastify: Fastify.FastifyInstance) => {
  // TODO: Replace with a real database
  const entryPoints = <string[]>["node-1"];

  // Simple API
  fastify.get("/api/entry-points", async (_request, _reply) => {
    return entryPoints;
  });
};

export default entryPointsApi;
