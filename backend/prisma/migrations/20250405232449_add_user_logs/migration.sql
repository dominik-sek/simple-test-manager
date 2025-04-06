-- CreateEnum
CREATE TYPE "test_status" AS ENUM ('todo', 'running', 'review', 'done');

-- CreateEnum
CREATE TYPE "test_step_status" AS ENUM ('ok', 'fail');

-- CreateTable
CREATE TABLE "user_log" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_case" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "description" VARCHAR(255),
    "status" "test_status",
    "parameters" JSONB,

    CONSTRAINT "test_case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_case_run" (
    "id" SERIAL NOT NULL,
    "test_case_id" INTEGER NOT NULL,
    "test_run_id" INTEGER NOT NULL,
    "status" "test_status",

    CONSTRAINT "test_case_run_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_collection" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "description" VARCHAR(255),

    CONSTRAINT "test_collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_collection_test_case" (
    "id" SERIAL NOT NULL,
    "test_collection_id" INTEGER NOT NULL,
    "test_case_id" INTEGER NOT NULL,

    CONSTRAINT "test_collection_test_case_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_project" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),

    CONSTRAINT "test_project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_project_collection" (
    "id" SERIAL NOT NULL,
    "test_project_id" INTEGER,
    "test_collection_id" INTEGER,

    CONSTRAINT "test_project_collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_project_user" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "test_project_id" INTEGER NOT NULL,

    CONSTRAINT "test_project_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_run" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "started_at" TIMESTAMP(6),
    "finished_at" TIMESTAMP(6),

    CONSTRAINT "test_run_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_step" (
    "id" SERIAL NOT NULL,
    "test_case_id" INTEGER NOT NULL,
    "step_actions" VARCHAR(1024),
    "expected_results" VARCHAR(1024),

    CONSTRAINT "test_step_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_step_run" (
    "id" SERIAL NOT NULL,
    "test_step_id" INTEGER NOT NULL,
    "test_case_run_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "actual_results" VARCHAR(1024),
    "status" "test_step_status",

    CONSTRAINT "test_step_run_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255),
    "password" VARCHAR(255),
    "role" VARCHAR(15) DEFAULT 'user',
    "full_name" VARCHAR(255),
    "email" VARCHAR(128),
    "created_at" TIMESTAMP(6),
    "last_login" TIMESTAMP(6),
    "is_active" BOOLEAN,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "test_project_name_key" ON "test_project"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "user_log" ADD CONSTRAINT "user_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_case_run" ADD CONSTRAINT "test_case_run_test_case_id_fkey" FOREIGN KEY ("test_case_id") REFERENCES "test_case"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "test_case_run" ADD CONSTRAINT "test_case_run_test_run_id_fkey" FOREIGN KEY ("test_run_id") REFERENCES "test_run"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "test_collection_test_case" ADD CONSTRAINT "test_collection_test_case_test_case_id_fkey" FOREIGN KEY ("test_case_id") REFERENCES "test_case"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "test_collection_test_case" ADD CONSTRAINT "test_collection_test_case_test_collection_id_fkey" FOREIGN KEY ("test_collection_id") REFERENCES "test_collection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "test_project_collection" ADD CONSTRAINT "test_project_collection_test_collection_id_fkey" FOREIGN KEY ("test_collection_id") REFERENCES "test_collection"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "test_project_collection" ADD CONSTRAINT "test_project_collection_test_project_id_fkey" FOREIGN KEY ("test_project_id") REFERENCES "test_project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "test_project_user" ADD CONSTRAINT "test_project_user_test_project_id_fkey" FOREIGN KEY ("test_project_id") REFERENCES "test_project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "test_project_user" ADD CONSTRAINT "test_project_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "test_step" ADD CONSTRAINT "test_step_test_case_id_fkey" FOREIGN KEY ("test_case_id") REFERENCES "test_case"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "test_step_run" ADD CONSTRAINT "test_step_run_test_case_run_id_fkey" FOREIGN KEY ("test_case_run_id") REFERENCES "test_case_run"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "test_step_run" ADD CONSTRAINT "test_step_run_test_step_id_fkey" FOREIGN KEY ("test_step_id") REFERENCES "test_step"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "test_step_run" ADD CONSTRAINT "test_step_run_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
