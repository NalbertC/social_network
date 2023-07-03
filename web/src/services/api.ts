import axios from "axios";

export const api = axios.create({
  baseURL: `http://localhost:8000`,
});

export const createSession = async (username: string, password: string) => {
  const session = api.post("/login", { username, password });

  return session;
};
