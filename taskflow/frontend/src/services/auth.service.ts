import {loginApi, signupApi, forgotPasswordApi, resetPasswordApi, type LoginData, type SignupData, type ForgotPasswordData, type ResetPasswordData} from "../api/auth.api";

/* Signup */
export const signupService = async (
  data: SignupData
) => {
  const result =
    await signupApi(data);

  const token =
    result.data.token;

  if (token) {
    localStorage.setItem(
      "token",
      token
    );
  }

  return result;
};

/* Login */
export const loginService = async (
  data: LoginData
) => {
  const result =
    await loginApi(data);

  const token =
    result.data.token;

  if (token) {
    localStorage.setItem(
      "token",
      token
    );
  }

  return result;
};

/*  Forgot Password  */
export const forgotPasswordService =
  async (
    data: ForgotPasswordData
  ) => {
    const result =
      await forgotPasswordApi(
        data
      );

    return result;
  };

/*  Reset Password  */
export const resetPasswordService =
  async (
    token: string,
    data: ResetPasswordData
  ) => {
    const result =
      await resetPasswordApi(
        token,
        data
      );

    return result;
  };

/* Logout  */
export const logoutService =
  (): void => {
    localStorage.removeItem(
      "token"
    );
  };