import {getProfileApi, updateProfileApi} from "../api/user.api";

import type {UpdateProfileData} from "../interfaces/user";

export const getProfileService =
  async () => {
    return await getProfileApi();
  };

export const updateProfileService =
  async (
    data: UpdateProfileData
  ) => {
    return await updateProfileApi(
      data
    );
  };