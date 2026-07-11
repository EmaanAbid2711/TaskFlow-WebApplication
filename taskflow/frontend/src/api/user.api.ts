import api from "./axios";
import type {UpdateProfileData} from "../interfaces/user";

export const getProfileApi =
  async () => {
    const response =
      await api.get(
        "/api/users/profile"
      );

    return response.data;
  };

export const updateProfileApi =
  async (
    data: UpdateProfileData
  ) => {
    const response =
      await api.put(
        "/api/users/profile",
        data
      );

    return response.data;
  };