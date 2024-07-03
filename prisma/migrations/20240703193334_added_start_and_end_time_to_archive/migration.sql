/*
  Warnings:

  - Added the required column `start_time` to the `archive` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "archive" ADD COLUMN     "end_time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "start_time" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
