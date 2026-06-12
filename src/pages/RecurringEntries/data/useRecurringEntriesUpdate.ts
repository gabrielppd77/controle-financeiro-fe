import { useMutation } from "@tanstack/react-query";

import api from "@libs/api";
import { notifyUpdate } from "@libs/notification";
import { fireError } from "@libs/alert";

import type { UpdateRecurringEntryRequest } from "./dtos/UpdateRecurringEntryRequest";

interface RequestProps {
  data: UpdateRecurringEntryRequest;
}

export default function useRecurringEntriesUpdate() {
  async function handleRequest({ data }: RequestProps) {
    await api.put("/RecurringEntries", data);
  }

  return useMutation({
    mutationFn: handleRequest,
    onSuccess: () => notifyUpdate(),
    onError: fireError,
  });
}
