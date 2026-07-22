/*
  Warnings:

  - You are about to drop the column `mimeType` on the `TaskAttachment` table. All the data in the column will be lost.
  - Added the required column `fileType` to the `TaskAttachment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TaskAttachment" DROP COLUMN "mimeType",
ADD COLUMN     "fileType" TEXT NOT NULL,
ALTER COLUMN "fileSize" SET DATA TYPE TEXT;
