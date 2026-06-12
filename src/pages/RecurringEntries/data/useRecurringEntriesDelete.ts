import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "@libs/api";
import { notifyRemove } from "@libs/notification";
import { fireError } from "@libs/alert";

import { queryRecurringEntriesList } from "./useRecurringEntriesList";

export default function useRecurringEntriesDelete() {
  const queryClient = useQueryClient();

  async function handleRequest(id: string) {
    await api.delete(`/RecurringEntries/${id}`);
  }

  return useMutation({
    mutationFn: handleRequest,
    onSuccess: () => {
      notifyRemove();
      queryClient.invalidateQueries({ queryKey: queryRecurringEntriesList });
    },
    onError: fireError,
  });
}
