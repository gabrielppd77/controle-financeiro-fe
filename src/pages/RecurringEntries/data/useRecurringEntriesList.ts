import { useQuery } from "@tanstack/react-query";

import api from "@libs/api";
import { fireError } from "@libs/alert";

import type { RecurringEntryResponse } from "./dtos/RecurringEntryResponse";

const url = "/RecurringEntries";

export const queryRecurringEntriesList = [url];

interface RequestProps {
  enabled: boolean;
}

export default function useRecurringEntriesList({ enabled }: RequestProps) {
  async function handleRequest() {
    const response = await api.get<RecurringEntryResponse[]>(url);
    return response.data;
  }

  const { error, ...rest } = useQuery({
    queryKey: queryRecurringEntriesList,
    queryFn: handleRequest,
    enabled,
  });

  if (error) {
    fireError(error);
  }

  return rest;
}
