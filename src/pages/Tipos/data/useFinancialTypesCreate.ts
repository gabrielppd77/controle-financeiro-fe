import { useMutation } from "@tanstack/react-query";

import type { CreateFinancialTypeRequest } from "./dtos/CreateFinancialTypeRequest";

import api from "@libs/api";

import { notifyCreate } from "@libs/notification";
import { fireError } from "@libs/alert";

interface RequestProps {
  data: CreateFinancialTypeRequest;
}

export default function useFinancialTypesCreate() {
  async function handleRequest({ data }: RequestProps) {
    await api.post("/FinancialTypes", data);
  }

  return useMutation({
    mutationFn: handleRequest,
    onSuccess: () => notifyCreate(),
    onError: fireError,
  });
}
