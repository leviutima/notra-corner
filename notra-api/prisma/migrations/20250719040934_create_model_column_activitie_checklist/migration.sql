-- CreateTable
CREATE TABLE "Column" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Column_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activitie" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "columnId" TEXT NOT NULL,

    CONSTRAINT "Activitie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CheckList" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "finished" BOOLEAN NOT NULL,
    "activitieId" TEXT NOT NULL,

    CONSTRAINT "CheckList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Column" ADD CONSTRAINT "Column_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activitie" ADD CONSTRAINT "Activitie_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Column"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckList" ADD CONSTRAINT "CheckList_activitieId_fkey" FOREIGN KEY ("activitieId") REFERENCES "Activitie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
