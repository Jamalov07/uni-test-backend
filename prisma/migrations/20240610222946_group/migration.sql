-- CreateTable
CREATE TABLE "group" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "name" VARCHAR(255) NOT NULL,
    "course_id" UUID NOT NULL,
    "faculty_id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,
    "deleted_at" TIMESTAMP,

    CONSTRAINT "group_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "faculty"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
