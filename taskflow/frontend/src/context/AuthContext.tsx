import {createContext, useContext, useEffect, useState, type ReactNode} from "react";

import { getProfileApi } from "../api/user.api";
import { logoutService } from "../services/auth.service";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
        
          setUser(
            response.data
          );
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
  const logout = () => {
    logoutService();
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
