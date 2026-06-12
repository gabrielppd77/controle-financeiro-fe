import { useQuery } from "@tanstack/react-query";

import api from "@libs/api";
import { fireError } from "@libs/alert";

import type { RecurringEntryResponse } from "./dtos/RecurringEntryResponse";

export default function useRecurringEntriesGet(id?: string) {
  const url = `/RecurringEntries/${id ?? ""}`;

  async function handleRequest() {
    const response = await api.get<RecurringEntryResponse>(url);
    return response.data;
  }

  const { error, ...rest } = useQuery({
    queryKey: [url],
    queryFn: handleRequest,
    enabled: !!id,
  });

  if (error) {
    fireError(error);
  }

  return rest;
}
