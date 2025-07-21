/*
  Warnings:

  - Added the required column `finished` to the `Activitie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activitie" ADD COLUMN     "finished" BOOLEAN NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
