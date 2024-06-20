-- AddForeignKey
ALTER TABLE "user_info" ADD CONSTRAINT "user_info_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
