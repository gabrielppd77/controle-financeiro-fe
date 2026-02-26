import { useMutation } from "@tanstack/react-query";

import type { UpdateClassificationRequest } from "./dtos/UpdateClassificationRequest";

import api from "@libs/api";

import { notifyUpdate } from "@libs/notification";
import { extractError } from "@libs/alert";

interface RequestProps {
  data: UpdateClassificationRequest;
}

export default function useClassificationsUpdate() {
  async function handleRequest({ data }: RequestProps) {
    await api.put("/Classifications", data);
  }

  return useMutation({
    mutationFn: handleRequest,
    onSuccess: () => notifyUpdate(),
    onError: extractError,
  });
}
