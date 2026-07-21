import { useEffect, useState } from "react";

import { getUsersApi } from "@/api/user.api";

export interface UserOption {
  id: string;
  name: string;
  avatar: string;
  role?: string;
}

export function useUsers() {

  const [users, setUsers] =
    useState<UserOption[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {

    try {
      const response =
        await getUsersApi();
      setUsers(response.data);
    }

    catch (error) {
      console.log(error);
    }

    finally {
      setLoading(false);
    }
  }

  return {
    users,
    loading,
    refreshUsers: loadUsers,
  };

}