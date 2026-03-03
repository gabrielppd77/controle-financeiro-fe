import { useMutation } from "@tanstack/react-query";

import type { CreateFinancialEntryRequest } from "./dtos/CreateFinancialEntryRequest";

import api from "@libs/api";

import { notifyCreate } from "@libs/notification";
import { extractError } from "@libs/alert";

interface RequestProps {
  data: CreateFinancialEntryRequest;
}

export default function useFinancialEntriesCreate() {
  async function handleRequest({ data }: RequestProps) {
    await api.post("/FinancialEntries", data);
  }

  return useMutation({
    mutationFn: handleRequest,
    onSuccess: () => notifyCreate(),
    onError: extractError,
  });
}
