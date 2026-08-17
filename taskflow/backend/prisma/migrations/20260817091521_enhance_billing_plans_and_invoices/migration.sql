/*
  Warnings:

  - Added the required column `plan` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "plan" "PlanType" NOT NULL;
