import { useEffect, useState } from "react";

import { getTeamMembersService } from "@/services/team.service";
import { useAuth } from "@/context/AuthContext";

export interface UserOption {
  id: string;
  name: string;
  avatar: string;
  role?: string;
}

export function useUsers() {
  const { user, loading: authLoading } = useAuth();

  const [users, setUsers] = useState<UserOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    loadUsers();
  }, [authLoading, user]);

  async function loadUsers() {
    try {
      const members = await getTeamMembersService();

      const teamUsers: UserOption[] = members.map((item: any) => ({
        id: item.member.id,
        name: item.member.name,
        avatar: item.member.avatar ?? "",
      }));

      const currentUser: UserOption[] = user
        ? [
            {
              id: user.id,
              name: user.name,
              avatar: user.avatar ?? "",
              role: "Owner",
            },
          ]
        : [];

      const uniqueUsers = [
        ...currentUser,
        ...teamUsers,
      ].filter(
        (userOption, index, array) =>
          array.findIndex(
            (item) => item.id === userOption.id
          ) === index
      );

      setUsers(uniqueUsers);
    } catch (error) {
      console.log(error);

      // Even if the team-members API fails,
      // still show the logged-in user.
      if (user) {
        setUsers([
          {
            id: user.id,
            name: user.name,
            avatar: user.avatar ?? "",
            role: "Owner",
          },
        ]);
      } else {
        setUsers([]);
      }
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