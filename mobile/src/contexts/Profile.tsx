import { createContext, useEffect, useState } from "react";

import { api } from "../libs/axios";

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
  const [userProfile, setUser] = useState<User>({} as User);

  useEffect(() => {
    (async () => {
      const response = await api.get("/users/user");

      setUser(response.data);
    })();
  }, []);

  return (
    <ProfileContext.Provider value={{ userProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
