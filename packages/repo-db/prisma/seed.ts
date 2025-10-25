#!/usr/bin/env ts-node

import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();
const saltRounds = 10;

async function main() {
  const hashedPassword = await bcrypt.hash("password", saltRounds);

  const user = await prisma.user.create({
    data: {
      password: hashedPassword,
    },
  });

  await prisma.account.createMany({
    data: [
      {
        name: "dvtzoe",
        userId: user.id,
      },
      {
        name: "nexuko",
        userId: user.id,
      },
    ],
  });

  await prisma.vertex.createMany({
    data: [
      {
        owner: "dvtzoe",
        name: "vertex-1",
        source:
          "https://raw.githubusercontent.com/dvtzoe/fictional-chainsaw/refs/heads/main/chapters/chap1.mdx",
        isEntryPoint: true,
      },
      {
        owner: "dvtzoe",
        name: "vertex-2",
        source:
          "https://raw.githubusercontent.com/dvtzoe/fictional-chainsaw/refs/heads/main/chapters/the-epic-chapter.mdx",
      },
    ],
  });
}

main()
  .then(() => {
    console.log("Seeding complete!");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
