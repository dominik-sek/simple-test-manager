/*
  Warnings:

  - You are about to drop the column `parameters` on the `test_case` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "test_case" DROP COLUMN "parameters";

-- CreateTable
CREATE TABLE "test_parameter_key" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "test_parameter_key_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_parameter_value" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "key_id" INTEGER NOT NULL,

    CONSTRAINT "test_parameter_value_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_case_parameter" (
    "id" SERIAL NOT NULL,
    "test_case_id" INTEGER NOT NULL,
    "parameter_value_id" INTEGER NOT NULL,

    CONSTRAINT "test_case_parameter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "test_parameter_value" ADD CONSTRAINT "test_parameter_value_key_id_fkey" FOREIGN KEY ("key_id") REFERENCES "test_parameter_key"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_case_parameter" ADD CONSTRAINT "test_case_parameter_parameter_value_id_fkey" FOREIGN KEY ("parameter_value_id") REFERENCES "test_parameter_value"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_case_parameter" ADD CONSTRAINT "test_case_parameter_test_case_id_fkey" FOREIGN KEY ("test_case_id") REFERENCES "test_case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
