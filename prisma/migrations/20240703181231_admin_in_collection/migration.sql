-- AlterTable
ALTER TABLE "collection" ADD COLUMN     "admin_id" UUID;

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "collection_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admin"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
