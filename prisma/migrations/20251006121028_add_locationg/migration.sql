-- CreateTable
CREATE TABLE "public"."Locationg" (
    "id" TEXT NOT NULL,
    "locationTitle" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lan" DOUBLE PRECISION NOT NULL,
    "tripId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Locationg_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Locationg" ADD CONSTRAINT "Locationg_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "public"."Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
