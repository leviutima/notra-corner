/*
  Warnings:

  - Added the required column `order` to the `Activitie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activitie" ADD COLUMN     "order" INTEGER NOT NULL;
