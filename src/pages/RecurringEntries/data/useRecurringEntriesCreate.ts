import { useMutation } from "@tanstack/react-query";

import api from "@libs/api";
import { notifyCreate } from "@libs/notification";
import { fireError } from "@libs/alert";

import type { CreateRecurringEntryRequest } from "./dtos/CreateRecurringEntryRequest";

interface RequestProps {
  data: CreateRecurringEntryRequest;
}

export default function useRecurringEntriesCreate() {
  async function handleRequest({ data }: RequestProps) {
    await api.post("/RecurringEntries", data);
  }

  return useMutation({
    mutationFn: handleRequest,
    onSuccess: () => notifyCreate(),
    onError: fireError,
  });
}
