/*
  Warnings:

  - The `type` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserTypeEnum" AS ENUM ('student');

-- CreateEnum
CREATE TYPE "AdminTypeEnum" AS ENUM ('admin', 'super');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "type",
ADD COLUMN     "type" "UserTypeEnum" NOT NULL DEFAULT 'student';

-- DropEnum
DROP TYPE "UserType";

-- CreateTable
CREATE TABLE "admin" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "image" VARCHAR(255) NOT NULL DEFAULT '',
    "type" "AdminTypeEnum" NOT NULL DEFAULT 'admin',
    "password" VARCHAR(255) NOT NULL,
    "full_name" VARCHAR(255) NOT NULL,
    "email_address" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);
