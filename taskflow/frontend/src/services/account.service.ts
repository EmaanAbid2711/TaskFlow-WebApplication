import api from "@/api/axios";

export const getAccountService = () => {
  return api.get("/account");
};

export const updateEmailService = (
  email: string
) => {
  return api.patch(
    "/account/email",
    {
      email,
    }
  );
};

export const updatePasswordService = (
  currentPassword: string,
  newPassword: string
) => {
  return api.patch(
    "/account/password",
    {
      currentPassword,
      newPassword,
    }
  );
};