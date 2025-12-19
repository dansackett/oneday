/*
  Warnings:

  - You are about to drop the `DailyEntry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "DailyEntry";

-- CreateTable
CREATE TABLE "daily_entries" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "heavy" TEXT,
    "good" TEXT,
    "nextStep" TEXT,
    "smallWin" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "daily_entries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "daily_entries_user_id_date_idx" ON "daily_entries"("user_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "daily_entries_user_id_date_key" ON "daily_entries"("user_id", "date");
