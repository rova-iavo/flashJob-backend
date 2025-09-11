/*
  Warnings:

  - You are about to drop the column `serviceId` on the `Avis` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `Offre` table. All the data in the column will be lost.
  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `prestationId` to the `Avis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prestationId` to the `Offre` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Avis" DROP CONSTRAINT "Avis_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Offre" DROP CONSTRAINT "Offre_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Service" DROP CONSTRAINT "Service_categorieId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Service" DROP CONSTRAINT "Service_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Avis" DROP COLUMN "serviceId",
ADD COLUMN     "prestationId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Offre" DROP COLUMN "serviceId",
ADD COLUMN     "prestationId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."Service";

-- CreateTable
CREATE TABLE "public"."prestation" (
    "id_prestation" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "categorieId" INTEGER NOT NULL,
    "prestation_image" TEXT NOT NULL,
    "nom_prestation" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "note_moyenne" DOUBLE PRECISION NOT NULL,
    "nombre_avis" INTEGER NOT NULL,
    "delai_livraison_prestation_heures" INTEGER NOT NULL,
    "paiement_securise" BOOLEAN NOT NULL,
    "express" BOOLEAN NOT NULL,

    CONSTRAINT "prestation_pkey" PRIMARY KEY ("id_prestation")
);

-- AddForeignKey
ALTER TABLE "public"."prestation" ADD CONSTRAINT "prestation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."prestation" ADD CONSTRAINT "prestation_categorieId_fkey" FOREIGN KEY ("categorieId") REFERENCES "public"."Categorie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Offre" ADD CONSTRAINT "Offre_prestationId_fkey" FOREIGN KEY ("prestationId") REFERENCES "public"."prestation"("id_prestation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Avis" ADD CONSTRAINT "Avis_prestationId_fkey" FOREIGN KEY ("prestationId") REFERENCES "public"."prestation"("id_prestation") ON DELETE RESTRICT ON UPDATE CASCADE;
