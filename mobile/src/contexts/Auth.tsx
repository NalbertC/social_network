import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { api } from "../libs/axios";

interface User {
  id: string;
  name: string;
  username: string;
  image?: string;
  imageKey?: string;
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
    (async () => {
      const recoveredUser = await AsyncStorage.getItem("user");

      if (recoveredUser) {
        setUser(JSON.parse(recoveredUser));
      }

      console.log(recoveredUser);

      setLoading(false);
    })();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      const response = await api.post("/login", {
        username,
        password,
      });

      const loggedUser = response.data.user;
      const token = response.data.token;

      AsyncStorage.setItem("user", JSON.stringify(loggedUser));
      AsyncStorage.setItem("token", token);

      api.defaults.headers.authorization = `Bearer ${token}`;

      setUser(response.data.user);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 500) {
          return Alert.alert("Ops...", "Usuario ou senha inválidos");
        }

        return err.response?.status;
      }
      return Alert.alert("Ops...", "Erro ao conectar-se ao servidor");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    AsyncStorage.removeItem("user");
    AsyncStorage.removeItem("token");
    setUser({} as User);
    api.defaults.headers.authorization = null;
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
