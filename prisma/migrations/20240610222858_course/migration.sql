-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('admin', 'student');

-- CreateTable
CREATE TABLE "course" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "stage" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "course_pkey" PRIMARY KEY ("id")
);
