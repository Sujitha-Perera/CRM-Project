import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("crm_token"));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("crm_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    const payload = response.data.data;

    localStorage.setItem("crm_token", payload.token);
    localStorage.setItem("crm_user", JSON.stringify(payload.user));
    setToken(payload.token);
    setUser(payload.user);

    return payload.user;
  };

  const logout = () => {
    localStorage.removeItem("crm_token");
    localStorage.removeItem("crm_user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        ready,
        isAuthenticated: Boolean(token),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
