"use client";

import { createContext, ReactNode, useContext, useState, useEffect } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [ isAuthenticated, setAuthenticated ] = useState(false);

  useEffect(() => {
    const checkAuthCookie = () => {
      const cookies = document.cookie.split("; ");
      const authCookie = cookies.find((cookie) => cookie.startsWith("auth_token="));
      if (authCookie) {
        setAuthenticated(true);
      }
    };

    checkAuthCookie();
  }, []);

  return (
    <AuthContext.Provider value={{isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth Must Be Used Within an AuthProvider");
  return context
}