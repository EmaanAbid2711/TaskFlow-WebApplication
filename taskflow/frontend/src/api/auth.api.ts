import api from "./axios";

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    expiresAt: string;
  };
}

export interface SimpleResponse {
  success: boolean;
  message: string;
}

/* Signup */

export const signupApi = async (
  data: SignupData
): Promise<AuthResponse> => {
  const response =
    await api.post<AuthResponse>(
      "/api/auth/signup",
      data
    );

  return response.data;
};

/* Login */

export const loginApi = async (
  data: LoginData
): Promise<AuthResponse> => {
  const response =
    await api.post<AuthResponse>(
      "/api/auth/login",
      data
    );

  return response.data;
};

/*  Forgot Password  */

export const forgotPasswordApi = async (
  data: ForgotPasswordData
): Promise<ForgotPasswordResponse> => {
  const response =
    await api.post<ForgotPasswordResponse>(
      "/api/auth/forgot-password",
      data
    );

  return response.data;
};

/* Reset Password */

export const resetPasswordApi = async (
  token: string,
  data: ResetPasswordData
): Promise<SimpleResponse> => {
  const response =
    await api.post<SimpleResponse>(
      `/api/auth/reset-password/${token}`,
      data
    );

  return response.data;
};