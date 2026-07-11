export interface NotificationSettings {
  taskAssignedEmail: boolean;
  taskAssignedPush: boolean;

  commentsEmail: boolean;
  commentsPush: boolean;

  remindersEmail: boolean;
  remindersPush: boolean;

  completedEmail: boolean;
  completedPush: boolean;

  invitationEmail: boolean;
  invitationPush: boolean;

  statusEmail: boolean;
  statusPush: boolean;

  memberEmail: boolean;
  memberPush: boolean;

  securityEmail: boolean;
  securityPush: boolean;

  productEmail: boolean;
  productPush: boolean;
}