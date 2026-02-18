import { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
  isLogin: boolean;
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  // 새로고침 시 로그인 유지
  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    if (savedUser) {
      setIsLogin(true);
      setUsername(savedUser);
    }
  }, []);

  const login = (username: string) => {
    setIsLogin(true);
    setUsername(username);
    localStorage.setItem("username", username);
  };

  const logout = () => {
    setIsLogin(false);
    setUsername(null);
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider value={{ isLogin, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthProvider 안에서 사용해야 합니다.");
  }
  return context;
};
