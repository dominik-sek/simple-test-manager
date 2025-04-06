-- DropForeignKey
ALTER TABLE "user_log" DROP CONSTRAINT "user_log_user_id_fkey";

-- AlterTable
ALTER TABLE "user_log" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user_log" ADD CONSTRAINT "user_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
