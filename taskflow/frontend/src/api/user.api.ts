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