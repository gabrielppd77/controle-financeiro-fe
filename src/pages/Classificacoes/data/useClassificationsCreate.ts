import { useMutation } from "@tanstack/react-query";

import type { CreateClassificationRequest } from "./dtos/CreateClassificationRequest";

import api from "@libs/api";

import { notifyCreate } from "@libs/notification";
import { extractError } from "@libs/alert";

interface RequestProps {
  data: CreateClassificationRequest;
}

export default function useClassificationsCreate() {
  async function handleRequest({ data }: RequestProps) {
    await api.post("/Classifications", data);
  }

  return useMutation({
    mutationFn: handleRequest,
    onSuccess: () => notifyCreate(),
    onError: extractError,
  });
}
