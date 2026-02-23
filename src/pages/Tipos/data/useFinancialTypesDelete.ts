import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "@libs/api";

import { notifyRemove } from "@libs/notification";
import { extractError } from "@libs/alert";

import { queryFinancialTypesList } from "./useFinancialTypesList";

export default function useFinancialTypesDelete() {
  const queryClient = useQueryClient();

  async function handleRequest(id: string) {
    await api.delete(`/FinancialTypes/${id}`);
  }

  return useMutation({
    mutationFn: handleRequest,
    onSuccess: () => {
      notifyRemove();
      queryClient.invalidateQueries({
        queryKey: queryFinancialTypesList,
      });
    },
    onError: extractError,
  });
}
