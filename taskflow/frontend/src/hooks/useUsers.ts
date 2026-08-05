import { useEffect, useState } from "react";

import { getTeamMembersService } from "@/services/team.service";

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
      const members =
        await getTeamMembersService();

      setUsers(
        members.map((item: any) => ({
          id: item.member.id,
          name: item.member.name,
          avatar: item.member.avatar ?? "",
        }))
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    users,
    loading,
    refreshUsers: loadUsers,
  };
}