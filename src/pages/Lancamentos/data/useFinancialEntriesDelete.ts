import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "@libs/api";

import { notifyRemove } from "@libs/notification";
import { extractError } from "@libs/alert";

import { queryFinancialEntriesList } from "./useFinancialEntriesList";

export default function useFinancialEntriesDelete() {
  const queryClient = useQueryClient();

  async function handleRequest(id: string) {
    await api.delete(`/FinancialEntries/${id}`);
  }

  return useMutation({
    mutationFn: handleRequest,
    onSuccess: () => {
      notifyRemove();
      queryClient.invalidateQueries({
        queryKey: queryFinancialEntriesList,
      });
    },
    onError: extractError,
  });
}
