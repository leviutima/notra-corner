-- DropForeignKey
ALTER TABLE "Activitie" DROP CONSTRAINT "Activitie_columnId_fkey";

-- AddForeignKey
ALTER TABLE "Activitie" ADD CONSTRAINT "Activitie_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Column"("id") ON DELETE CASCADE ON UPDATE CASCADE;
