/*
  Warnings:

  - You are about to drop the column `expired` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `rating_avg` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[supabaseUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firstname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supabaseUserId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "public"."User_username_key";

-- AlterTable
ALTER TABLE "public"."Token" DROP COLUMN "expired",
ADD COLUMN     "is_expired" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "created_at",
DROP COLUMN "rating_avg",
DROP COLUMN "username",
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "is_subscribed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "supabaseUserId" TEXT NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL;

-- DropEnum
DROP TYPE "public"."Role";

-- CreateTable
CREATE TABLE "public"."Service" (
    "id_service" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "categorieId" INTEGER NOT NULL,
    "service_image" TEXT NOT NULL,
    "nom_service" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "note_moyenne" DOUBLE PRECISION NOT NULL,
    "nombre_avis" INTEGER NOT NULL,
    "delai_livraison_service_heures" INTEGER NOT NULL,
    "paiement_securise" BOOLEAN NOT NULL,
    "express" BOOLEAN NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id_service")
);

-- CreateTable
CREATE TABLE "public"."Offre" (
    "id_offre" SERIAL NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "nom_offre" TEXT NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,
    "delai_livraison_offre_heures" INTEGER NOT NULL,
    "is_popular" BOOLEAN NOT NULL,

    CONSTRAINT "Offre_pkey" PRIMARY KEY ("id_offre")
);

-- CreateTable
CREATE TABLE "public"."Caracteristique" (
    "id_caracteristique" SERIAL NOT NULL,
    "offreId" INTEGER NOT NULL,
    "nom_caracteristique" TEXT NOT NULL,

    CONSTRAINT "Caracteristique_pkey" PRIMARY KEY ("id_caracteristique")
);

-- CreateTable
CREATE TABLE "public"."Avis" (
    "id_avis" SERIAL NOT NULL,
    "utilisateurId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "note" DOUBLE PRECISION NOT NULL,
    "commentaire" TEXT NOT NULL,
    "date_avis" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Avis_pkey" PRIMARY KEY ("id_avis")
);

-- CreateTable
CREATE TABLE "public"."Categorie" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "Categorie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_supabaseUserId_key" ON "public"."User"("supabaseUserId");

-- AddForeignKey
ALTER TABLE "public"."Service" ADD CONSTRAINT "Service_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Service" ADD CONSTRAINT "Service_categorieId_fkey" FOREIGN KEY ("categorieId") REFERENCES "public"."Categorie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Offre" ADD CONSTRAINT "Offre_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "public"."Service"("id_service") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Caracteristique" ADD CONSTRAINT "Caracteristique_offreId_fkey" FOREIGN KEY ("offreId") REFERENCES "public"."Offre"("id_offre") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Avis" ADD CONSTRAINT "Avis_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Avis" ADD CONSTRAINT "Avis_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "public"."Service"("id_service") ON DELETE RESTRICT ON UPDATE CASCADE;
