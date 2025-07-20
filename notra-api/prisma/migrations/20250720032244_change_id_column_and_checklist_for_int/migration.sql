/*
  Warnings:

  - The primary key for the `CheckList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `CheckList` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Column` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Column` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `columnId` on the `Activitie` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Activitie" DROP CONSTRAINT "Activitie_columnId_fkey";

-- AlterTable
ALTER TABLE "Activitie" DROP COLUMN "columnId",
ADD COLUMN     "columnId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CheckList" DROP CONSTRAINT "CheckList_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "CheckList_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Column" DROP CONSTRAINT "Column_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Column_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Activitie" ADD CONSTRAINT "Activitie_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Column"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
