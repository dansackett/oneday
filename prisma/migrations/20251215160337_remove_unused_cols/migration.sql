/*
  Warnings:

  - You are about to drop the column `smallWin` on the `daily_entries` table. All the data in the column will be lost.
  - You are about to drop the column `dob` on the `profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "daily_entries" DROP COLUMN "smallWin";

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "dob";
