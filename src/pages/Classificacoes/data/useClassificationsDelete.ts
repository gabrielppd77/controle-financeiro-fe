import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "@libs/api";

import { notifyRemove } from "@libs/notification";
import { extractError } from "@libs/alert";

import { queryClassificationsList } from "./useClassificationsList";

export default function useClassificationsDelete() {
  const queryClient = useQueryClient();

  async function handleRequest(id: string) {
    await api.delete(`/Classifications/${id}`);
  }

  return useMutation({
    mutationFn: handleRequest,
    onSuccess: () => {
      notifyRemove();
      queryClient.invalidateQueries({
        queryKey: queryClassificationsList,
      });
    },
    onError: extractError,
  });
}
