import { useContext } from "react";
import { ProfileContext } from "../contexts/Profile";

export function useProfile() {
  return useContext(ProfileContext);
}
