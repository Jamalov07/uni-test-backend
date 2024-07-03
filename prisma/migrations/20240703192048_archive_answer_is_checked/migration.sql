/*
  Warnings:

  - Added the required column `is_checked` to the `archive_answer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "archive_answer" ADD COLUMN     "is_checked" BOOLEAN NOT NULL;
