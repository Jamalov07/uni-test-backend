-- CreateTable
CREATE TABLE "archive_collection" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "name" VARCHAR(255) NOT NULL,
    "admin_id" UUID,
    "language" "CollectionLanguageEnum" NOT NULL,
    "science_id" UUID NOT NULL,
    "archive_id" UUID NOT NULL,
    "max_attempts" INTEGER NOT NULL,
    "givenMinutes" INTEGER NOT NULL,
    "amount_in_test" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "archive_collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "archive_question" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "text" VARCHAR(255) NOT NULL,
    "collection_id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "archive_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "archive_answer" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "text" VARCHAR(255) NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "question_id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "archive_answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "archive_collection_archive_id_key" ON "archive_collection"("archive_id");

-- AddForeignKey
ALTER TABLE "archive_collection" ADD CONSTRAINT "archive_collection_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "archive_collection" ADD CONSTRAINT "archive_collection_science_id_fkey" FOREIGN KEY ("science_id") REFERENCES "science"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "archive_collection" ADD CONSTRAINT "archive_collection_archive_id_fkey" FOREIGN KEY ("archive_id") REFERENCES "archive"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "archive_question" ADD CONSTRAINT "archive_question_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "archive_collection"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "archive_answer" ADD CONSTRAINT "archive_answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "archive_question"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
