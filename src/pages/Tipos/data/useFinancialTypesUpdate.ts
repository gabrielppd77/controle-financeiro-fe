import { useMutation } from "@tanstack/react-query";

import type { UpdateFinancialTypeRequest } from "./dtos/UpdateFinancialTypeRequest";

import api from "@libs/api";

import { notifyUpdate } from "@libs/notification";
import { extractError } from "@libs/alert";

interface RequestProps {
  data: UpdateFinancialTypeRequest;
}

export default function useFinancialTypesCreate() {
  async function handleRequest({ data }: RequestProps) {
    await api.put("/FinancialTypes", data);
  }

  return useMutation({
    mutationFn: handleRequest,
    onSuccess: () => notifyUpdate(),
    onError: extractError,
  });
}
