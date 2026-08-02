import {createContext, useContext, useEffect, useState, type ReactNode} from "react";

import { getProfileApi } from "@/api/user.api";
import { logoutService } from "@/services/auth.service";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;

  setUser: React.Dispatch<
    React.SetStateAction<User | null>
  >;

  /**
   * Update only the changed user fields.
   * Useful after profile updates.
   */
  updateUser: (
    data: Partial<User>
  ) => void;

  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadUser =
      async () => {
        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {
          setLoading(false);
          return;
        }

        try {
          const response =
            await getProfileApi();

          setUser(response.data);
        } catch (error) {
          console.error(error);

          localStorage.removeItem(
            "token"
          );

          setUser(null);
        } finally {
          setLoading(false);
        }
      };

    loadUser();
  }, []);

  /**
   * Merge new values into the current user.
   * This refreshes every component using useAuth().
   */
  const updateUser = (
    data: Partial<User>
  ) => {
    setUser((previous) => {
      if (!previous) {
        return previous;
      }

      return {
        ...previous,
        ...data,
      };
    });
  };

  const logout = async () => {
  await logoutService();
  setUser(null);
};

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}