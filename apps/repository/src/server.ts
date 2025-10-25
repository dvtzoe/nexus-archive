import cors from "@fastify/cors";
import * as Fastify from "fastify";
import entryPointsGet from "./entry_points";
import signup from "./signup";
import signin from "./login";
import vertexGet from "./vertex";

const tlsKey = process.env.REPOSITORY_TLS_KEY;
const tlsCert = process.env.REPOSITORY_TLS_CERT;

const fastify = Fastify.fastify({
  logger: true,
  trustProxy: true,
  https:
    tlsKey && tlsCert
      ? {
        key: tlsKey,
        cert: tlsCert,
      }
      : null,
})
  .register(cors, {
    origin: true,
  })
  .register(signup)
  .register(signin)
  .register(vertexGet)
  .register(entryPointsGet);

const start = async () => {
  const port = Number(process.env.REPOSITORY_PORT || process.env.PORT) || 39402;
  const host = process.env.REPOSITORY_HOST || "localhost";

  try {
    await fastify.listen({ port, host });
    fastify.log.info(`Server is running at http://${host}:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
