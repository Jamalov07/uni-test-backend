-- CreateTable
CREATE TABLE "user_collection" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "user_id" UUID NOT NULL,
    "have_attempt" INTEGER NOT NULL DEFAULT 1,
    "collection_id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "user_collection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_collection" ADD CONSTRAINT "user_collection_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_collection" ADD CONSTRAINT "user_collection_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "collection"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
