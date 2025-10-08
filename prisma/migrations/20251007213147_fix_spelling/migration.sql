/*
  Warnings:

  - You are about to drop the `Locationg` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Locationg" DROP CONSTRAINT "Locationg_tripId_fkey";

-- DropTable
DROP TABLE "public"."Locationg";

-- CreateTable
CREATE TABLE "public"."Location" (
    "id" TEXT NOT NULL,
    "locationTitle" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lan" DOUBLE PRECISION NOT NULL,
    "tripId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Location" ADD CONSTRAINT "Location_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "public"."Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
