-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "invitationId" TEXT;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "TeamInvitation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
