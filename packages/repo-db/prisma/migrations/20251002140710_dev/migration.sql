-- CreateTable
CREATE TABLE "Account" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Vertex" (
    "owner" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "isEntryPoint" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Vertex_pkey" PRIMARY KEY ("owner","name")
);

-- AddForeignKey
ALTER TABLE "Vertex" ADD CONSTRAINT "Vertex_owner_fkey" FOREIGN KEY ("owner") REFERENCES "Account"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
