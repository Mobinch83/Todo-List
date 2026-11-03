import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  const getUsers = () => JSON.parse(localStorage.getItem("users") || "[]");

  const register = (username, password) => {
    const users = getUsers();
    const exists = users.some((u) => u.username === username);
    if (exists) {
      return { ok: false, error: "این نام کاربری قبلاً ثبت شده" };
    }
    const newUser = { id: crypto.randomUUID(), username, password };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    return { ok: true };
  };

  const login = (username, password) => {
    const user = getUsers().find(
      (u) => u.username === username && u.password === password
    );
    if (!user) {
      return { ok: false, error: "نام کاربری یا رمز عبور اشتباه است" };
    }
    const session = { id: user.id, username: user.username };
    localStorage.setItem("currentUser", JSON.stringify(session));
    setCurrentUser(session);
    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}