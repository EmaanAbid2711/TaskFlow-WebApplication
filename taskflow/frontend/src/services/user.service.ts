import {
  getProfileApi,
  updateProfileApi,
} from "../api/user.api";

export const getProfileService =
  async () => {
    return await getProfileApi();
  };

export const updateProfileService =
  async (
    data: FormData
  ) => {
    return await updateProfileApi(
      data
    );
  };