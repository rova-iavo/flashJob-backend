/*
  Warnings:

  - The primary key for the `Offre` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_offre` on the `Offre` table. All the data in the column will be lost.
  - You are about to drop the `Caracteristique` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Caracteristique" DROP CONSTRAINT "Caracteristique_offreId_fkey";

-- AlterTable
ALTER TABLE "public"."Offre" DROP CONSTRAINT "Offre_pkey",
DROP COLUMN "id_offre",
ADD COLUMN     "caracteristiques" TEXT[],
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Offre_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "public"."Caracteristique";
