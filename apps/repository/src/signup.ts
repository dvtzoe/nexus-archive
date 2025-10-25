import { PrismaClient } from "@nexus-archive/repo-db";
import * as bcrypt from "bcrypt";
import type { FastifyInstance } from "fastify";

const prisma = new PrismaClient();
const saltRounds = 10;

export default async function (fastify: FastifyInstance) {
  fastify.post("/signup", async (request, reply) => {
    const { accountName, password } = request.body as {
      accountName: string;
      password: string;
    };

    if (!accountName || !password) {
      reply.code(400).send({ error: "accountName and password are required" });
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = await prisma.user.create({
        data: {
          password: hashedPassword,
          accounts: {
            create: {
              name: accountName,
            },
          },
        },
        include: {
          accounts: true,
        },
      });

      reply.code(201).send(user);
    } catch (error) {
      fastify.log.error(error);
      // P2002 is the Prisma error code for unique constraint violation
      if ((error as { code: string }).code === "P2002") {
        reply.code(409).send({ error: "Account name already exists" });
      } else {
        reply.code(500).send({ error: "Internal Server Error" });
      }
    }
  });
}
