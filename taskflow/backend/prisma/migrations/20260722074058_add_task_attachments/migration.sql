/*
  Warnings:

  - You are about to drop the column `fileType` on the `TaskAttachment` table. All the data in the column will be lost.
  - Added the required column `mimeType` to the `TaskAttachment` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `fileSize` on the `TaskAttachment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "TaskAttachment" DROP COLUMN "fileType",
ADD COLUMN     "mimeType" TEXT NOT NULL,
DROP COLUMN "fileSize",
ADD COLUMN     "fileSize" INTEGER NOT NULL;
