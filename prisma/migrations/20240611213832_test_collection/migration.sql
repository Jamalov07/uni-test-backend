-- CreateEnum
CREATE TYPE "CollectionLanguageEnum" AS ENUM ('uz', 'ru', 'en');

-- CreateTable
CREATE TABLE "collection" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "name" VARCHAR(255) NOT NULL,
    "language" "CollectionLanguageEnum" NOT NULL,
    "science_id" UUID NOT NULL,
    "max_attempts" INTEGER NOT NULL,
    "givenMinutes" INTEGER NOT NULL,
    "amount_in_test" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "text" VARCHAR(255) NOT NULL,
    "collection_id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answer" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "text" VARCHAR(255) NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "question_id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "archive" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "user_id" UUID NOT NULL,
    "collection_id" UUID NOT NULL,
    "faculty_id" UUID NOT NULL,
    "course_id" UUID NOT NULL,
    "group_id" UUID NOT NULL,
    "test_count" INTEGER NOT NULL,
    "result" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "archive_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "collection_science_id_fkey" FOREIGN KEY ("science_id") REFERENCES "science"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "question" ADD CONSTRAINT "question_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collection"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "answer" ADD CONSTRAINT "answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "archive" ADD CONSTRAINT "archive_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "archive" ADD CONSTRAINT "archive_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "archive" ADD CONSTRAINT "archive_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "archive" ADD CONSTRAINT "archive_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "faculty"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "archive" ADD CONSTRAINT "archive_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collection"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
