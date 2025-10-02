import React, { createContext, useState, useEffect, useContext } from "react";
import {
  getAccessToken,
  putAccessToken,
  getUserLogged,
} from "../utils/network-data";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = getAccessToken();
      if (token) {
        const { error, data } = await getUserLogged(token);
        if (!error) {
          setUser(data);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const loginUser = (accessToken, userData) => {
    putAccessToken(accessToken);
    setUser(userData);
  };

  const logoutUser = () => {
    putAccessToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth harus digunakan dalam AuthProvider");
  }

  return context;
};

export default AuthContext;
