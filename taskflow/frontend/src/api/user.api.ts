import api from "./axios";

export const getProfileApi = async()=>{
    const response =
        await api.get(
            "/users/profile"
        );
    return response.data;
};
