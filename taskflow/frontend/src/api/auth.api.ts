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

export const signupApi = async (
  data: SignupData
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/auth/signup",
    data
  );

  return response.data;
};

export const loginApi = async (
  data: LoginData
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/auth/login",
    data
  );

  return response.data;
};