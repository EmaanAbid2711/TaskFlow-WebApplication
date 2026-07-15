import {getProfileApi, updateProfileApi, getAllUsersApi} from "../api/user.api";

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

export const getAllUsersService = async () => {

  const response = await getAllUsersApi();

  return response.data;

};