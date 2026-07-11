-- CreateTable
CREATE TABLE "NotificationSettings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "taskAssignedEmail" BOOLEAN NOT NULL DEFAULT true,
    "taskAssignedPush" BOOLEAN NOT NULL DEFAULT true,
    "commentsEmail" BOOLEAN NOT NULL DEFAULT true,
    "commentsPush" BOOLEAN NOT NULL DEFAULT true,
    "remindersEmail" BOOLEAN NOT NULL DEFAULT true,
    "remindersPush" BOOLEAN NOT NULL DEFAULT false,
    "completedEmail" BOOLEAN NOT NULL DEFAULT false,
    "completedPush" BOOLEAN NOT NULL DEFAULT false,
    "invitationEmail" BOOLEAN NOT NULL DEFAULT true,
    "invitationPush" BOOLEAN NOT NULL DEFAULT true,
    "statusEmail" BOOLEAN NOT NULL DEFAULT true,
    "statusPush" BOOLEAN NOT NULL DEFAULT false,
    "memberEmail" BOOLEAN NOT NULL DEFAULT false,
    "memberPush" BOOLEAN NOT NULL DEFAULT false,
    "securityEmail" BOOLEAN NOT NULL DEFAULT true,
    "securityPush" BOOLEAN NOT NULL DEFAULT true,
    "productEmail" BOOLEAN NOT NULL DEFAULT true,
    "productPush" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotificationSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NotificationSettings_userId_key" ON "NotificationSettings"("userId");

-- AddForeignKey
ALTER TABLE "NotificationSettings" ADD CONSTRAINT "NotificationSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
