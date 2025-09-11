/*
  Warnings:

  - You are about to drop the column `utilisateurId` on the `Avis` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Avis` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Avis" DROP CONSTRAINT "Avis_utilisateurId_fkey";

-- AlterTable
ALTER TABLE "public"."Avis" DROP COLUMN "utilisateurId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Avis" ADD CONSTRAINT "Avis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
