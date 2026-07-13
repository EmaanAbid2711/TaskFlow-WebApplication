import api from "@/api/axios";

export const getAccountService =
  () => {
    return api.get(
      "/api/account"
    );
  };

export const updateEmailService =
  (
    email: string
  ) => {
    return api.patch(
      "/api/account/email",
      {
        email,
      }
    );
  };

export const updatePasswordService =
  (
    currentPassword: string,
    newPassword: string
  ) => {
    return api.patch(
      "/api/account/password",
      {
        currentPassword,
        newPassword,
      }
    );
  };

export const deleteAccountService =
  () => {
    return api.delete(
      "/api/account"
    );
  };

  export const getSecurityService =
  () => {
    return api.get(
      "/api/account/security"
    );
  };

export const updateSecurityService =
  (
    twoFactorEnabled: boolean
  ) => {
    return api.patch(
      "/api/account/security",
      {
        twoFactorEnabled,
      }
    );
  };