import api from "./axios";

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
    formData: FormData
  ) => {
    const response =
      await api.patch(
        "/api/users/profile",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };

export const getAllUsersApi = () => {
  return api.get("/api/users");
};

export const getUsersApi = async () => {

  const response = await api.get(
    "/api/users"
  );

  return response.data;

};

export const getUserByIdApi =
  async (
    userId: string
  ) => {
    const response =
      await api.get(
        `/api/users/${userId}`
      );
    return response.data;
  };