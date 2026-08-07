/*
  Warnings:

  - You are about to drop the `Media` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TaskMedia` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_uploadedByUserId_fkey";

-- DropForeignKey
ALTER TABLE "TaskMedia" DROP CONSTRAINT "TaskMedia_createdByUserId_fkey";

-- DropForeignKey
ALTER TABLE "TaskMedia" DROP CONSTRAINT "TaskMedia_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "TaskMedia" DROP CONSTRAINT "TaskMedia_taskId_fkey";

-- DropTable
DROP TABLE "Media";

-- DropTable
DROP TABLE "TaskMedia";

-- DropEnum
DROP TYPE "MediaStatus";

-- DropEnum
DROP TYPE "MediaVisibility";

-- CreateTable
CREATE TABLE "TaskAttachment" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileSize" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskAttachment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TaskAttachment" ADD CONSTRAINT "TaskAttachment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
