-- CreateTable
CREATE TABLE "FeatureSuggestion" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "suggestion" TEXT NOT NULL,

    CONSTRAINT "FeatureSuggestion_pkey" PRIMARY KEY ("id")
);
