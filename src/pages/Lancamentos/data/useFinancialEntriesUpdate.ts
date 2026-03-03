import { useMutation } from "@tanstack/react-query";

import type { UpdateFinancialEntryRequest } from "./dtos/UpdateFinancialEntryRequest";

import api from "@libs/api";

import { notifyUpdate } from "@libs/notification";
import { extractError } from "@libs/alert";

interface RequestProps {
  data: UpdateFinancialEntryRequest;
}

export default function useFinancialEntriesUpdate() {
  async function handleRequest({ data }: RequestProps) {
    await api.put("/FinancialEntries", data);
  }

  return useMutation({
    mutationFn: handleRequest,
    onSuccess: () => notifyUpdate(),
    onError: extractError,
  });
}
