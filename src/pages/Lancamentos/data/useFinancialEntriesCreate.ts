import { useMutation } from "@tanstack/react-query";

import type { CreateFinancialEntryRequest } from "./dtos/CreateFinancialEntryRequest";

import api from "@libs/api";

import { notifyCreate } from "@libs/notification";
import { fireError } from "@libs/alert";

interface RequestProps {
  data: CreateFinancialEntryRequest;
  params: {
    replicateUntilDate: string | null;
  };
}

export default function useFinancialEntriesCreate() {
  async function handleRequest({ data, params }: RequestProps) {
    await api.post("/FinancialEntries", data, {
      params,
    });
  }

  return useMutation({
    mutationFn: handleRequest,
    onSuccess: () => notifyCreate(),
    onError: fireError,
  });
}
