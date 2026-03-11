import { useMutation } from "@tanstack/react-query";

import api from "@libs/api";
import { fireError } from "@libs/alert";

import type { CreateUserRequest } from "./dtos/CreateUserRequest";
import type { AuthenticationResponse } from "@pages/Login/data/dtos/AuthenticationResponse";

export function useAuthenticationsRegister() {
  return useMutation({
    mutationFn: async (data: CreateUserRequest) => {
      const response = await api.post<AuthenticationResponse>(
        "/Authentications/Register",
        data,
      );
      return response.data;
    },
    onError: fireError,
  });
}
