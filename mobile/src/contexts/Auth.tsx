import { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { api } from "../libs/axios";

interface User {
  id: string;
  name: string;
  username: string;
  image?: string;
}

interface AuthContextType {
  user: User | undefined;
  authenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<any>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

interface AuthProviderProps {
  children: JSX.Element;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      const response = await api.post("/login", {
        username,
        password,
      });

      setUser(response.data.user);
    } catch (err) {

      return Alert.alert("Ops...", "Usuário ou senha inválidos")
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser({} as User)
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
