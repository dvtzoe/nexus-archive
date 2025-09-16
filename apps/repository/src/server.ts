import cors from "@fastify/cors";
import * as Fastify from "fastify";
import entryPointsApi from "./entry_points.js";
import nodeApi from "./node.js";

const fastify = Fastify.fastify({ logger: true });

// Register CORS
fastify.register(cors, {
  origin: true,
});

nodeApi(fastify);
entryPointsApi(fastify);

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: process.env.HOST || "localhost" });
    console.log("Server is running at http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
