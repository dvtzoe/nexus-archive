#!/usr/bin/env ts-node
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.account.createMany({
    data: [
      {
        name: "dvtzoe",
      },
      {
        name: "nexuko",
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
