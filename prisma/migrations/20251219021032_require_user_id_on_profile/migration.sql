/*
  Warnings:

  - Made the column `user_id` on table `profiles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "user_id" SET NOT NULL;
