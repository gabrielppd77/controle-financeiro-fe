import { useMutation } from "@tanstack/react-query";

import api from "@libs/api";
import type { LoginUserRequest } from "./dtos/LoginUserRequest";
import type { AuthenticationResponse } from "./dtos/AuthenticationResponse";
import { fireError } from "@libs/alert";

export function useAuthenticationsLogin() {
  return useMutation({
    mutationFn: async (data: LoginUserRequest) => {
      const response = await api.post<AuthenticationResponse>(
        "/Authentications/Login",
        data,
      );
      return response.data;
    },
    onError: fireError,
  });
}
