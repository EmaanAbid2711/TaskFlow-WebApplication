/*
  Warnings:

  - You are about to drop the column `ownerId` on the `TeamMember` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,memberId]` on the table `TeamMember` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `TeamMember` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_ownerId_fkey";

-- DropIndex
DROP INDEX "TeamMember_ownerId_memberId_key";

-- AlterTable
ALTER TABLE "TeamMember" DROP COLUMN "ownerId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_userId_memberId_key" ON "TeamMember"("userId", "memberId");

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
