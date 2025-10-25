import { PrismaClient } from "@nexus-archive/repo-db";
import * as bcrypt from "bcrypt";
import type { FastifyInstance } from "fastify";

const prisma = new PrismaClient();

export default async function (fastify: FastifyInstance) {
  fastify.post("/auth/login", async (request, reply) => {
    const { accountName, password } = request.body as {
      accountName: string;
      password: string;
    };

    if (!accountName || !password) {
      reply.code(400).send({ error: "accountName and password are required" });
      return;
    }

    try {
      const account = await prisma.account.findUnique({
        where: {
          name: accountName,
        },
        include: {
          user: true,
        },
      });

      if (!account) {
        reply.code(404).send({ error: "Account not found" });
        return;
      }

      const passwordMatch = await bcrypt.compare(
        password,
        account.user.password,
      );

      if (!passwordMatch) {
        reply.code(401).send({ error: "Invalid password" });
        return;
      }

      reply.code(200).send({
        id: account.user.id,
        accounts: [
          {
            name: account.name,
          },
        ],
      });
    } catch (error) {
      fastify.log.error(error);
      reply.code(500).send({ error: "Internal Server Error" });
    }
  });
}
