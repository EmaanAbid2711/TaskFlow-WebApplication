import {loginApi, signupApi, type LoginData, type SignupData} from "../api/auth.api";

export const signupService = async (
  data: SignupData
) => {
  const result = await signupApi(data);

  localStorage.setItem(
    "token",
    result.data.token
  );

  return result;
};

export const loginService = async (
  data: LoginData
) => {
  const result = await loginApi(data);

  localStorage.setItem(
    "token",
    result.data.token
  );

  return result;
};

export const logoutService = () => {
  localStorage.removeItem("token");
};