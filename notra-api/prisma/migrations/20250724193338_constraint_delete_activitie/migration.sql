-- DropForeignKey
ALTER TABLE "CheckList" DROP CONSTRAINT "CheckList_activitieId_fkey";

-- AddForeignKey
ALTER TABLE "CheckList" ADD CONSTRAINT "CheckList_activitieId_fkey" FOREIGN KEY ("activitieId") REFERENCES "Activitie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
