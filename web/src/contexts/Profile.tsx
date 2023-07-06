import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";

export interface User {
  id: string;
  name: string;
  username: string;
  image: IIMage;
}

interface IIMage {
  id: string;
  key: string;
  url: string;
}

interface AuthContextType {
  userProfile: User | undefined;
}

export const ProfileContext = createContext<AuthContextType>(
  {} as AuthContextType
);

interface ProfileProviderProps {
  children: JSX.Element;
}

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const {} = useAuth();
  const navigate = useNavigate();
  const [userProfile, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await api.get("/users/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUser(response.data);


    })();
  }, []);




  return (
    <ProfileContext.Provider value={{ userProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
