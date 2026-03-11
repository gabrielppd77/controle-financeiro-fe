import { useContext } from "react";

import AuthContext, { type AuthContextState } from "@contexts/AuthContext";

export default function useAuth() {
  return useContext<AuthContextState>(AuthContext);
}
