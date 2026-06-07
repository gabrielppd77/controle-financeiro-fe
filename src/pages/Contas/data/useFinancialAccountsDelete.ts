import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "@libs/api";

import { notifyRemove } from "@libs/notification";
import { fireError } from "@libs/alert";

import { queryFinancialAccountsList } from "./useFinancialAccountsList";

export default function useFinancialAccountsDelete() {
  const queryClient = useQueryClient();

  async function handleRequest(id: string) {
    await api.delete(`/FinancialAccounts/${id}`);
  }

  return useMutation({
    mutationFn: handleRequest,
    onSuccess: () => {
      notifyRemove();
      queryClient.invalidateQueries({
        queryKey: queryFinancialAccountsList,
      });
    },
    onError: fireError,
  });
}
