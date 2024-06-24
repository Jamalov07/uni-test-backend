/*
  Warnings:

  - Added the required column `semestr_id` to the `archive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semestr_id` to the `group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "archive" ADD COLUMN     "semestr_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "group" ADD COLUMN     "semestr_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "email_address" DROP NOT NULL;

-- CreateTable
CREATE TABLE "semestr" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "stage" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "semestr_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_semestr_id_fkey" FOREIGN KEY ("semestr_id") REFERENCES "semestr"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "archive" ADD CONSTRAINT "archive_semestr_id_fkey" FOREIGN KEY ("semestr_id") REFERENCES "semestr"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
