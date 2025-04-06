-- CreateEnum
CREATE TYPE "user_log_result" AS ENUM ('ERROR', 'INFO', 'WARNING');

-- AlterTable
ALTER TABLE "user_log" ADD COLUMN     "result" TEXT NOT NULL DEFAULT 'INFO';
