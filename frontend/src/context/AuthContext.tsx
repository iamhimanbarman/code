"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { authService } from "@/lib/services";

interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  role: string;
  streak?: number;
  xp?: number;
  level?: number;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    username: string;
    password: string;
    displayName: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      if (typeof window !== "undefined" && localStorage.getItem("accessToken")) {
        const userData = await authService.getMe();
        setUser(userData);
      }
    } catch {
      // Token expired or invalid
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (email: string, password: string) => {
    const result = await authService.login({ email, password });
    setUser(result.user);
  };

  const register = async (data: {
    email: string;
    username: string;
    password: string;
    displayName: string;
  }) => {
    const result = await authService.register(data);
    setUser(result.user);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
