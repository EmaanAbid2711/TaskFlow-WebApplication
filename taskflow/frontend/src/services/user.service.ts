import {getProfileApi, updateProfileApi, getAllUsersApi, getUserByIdApi} from "../api/user.api";

export const getProfileService = async () => {
  return await getProfileApi();
};

export const updateProfileService = async (
  data: FormData
) => {
  return await updateProfileApi(data);
};

export const getAllUsersService = async () => {
  const response = await getAllUsersApi();

  console.log("Axios Response:", response);
  console.log("Response Data:", response.data);

  // Return ONLY the users array
  return response.data.data;
};

export const getUserByIdService =
  async (
    userId: string
  ) => {
    return await getUserByIdApi(
      userId
    );
  };