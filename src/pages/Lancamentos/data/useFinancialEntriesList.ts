import { useQuery } from "@tanstack/react-query";

import api from "@libs/api";

import type { ListFinancialEntryResponse } from "./dtos/ListFinancialEntryResponse";
import { extractError } from "@libs/alert";

const url = "/FinancialEntries/List";

export function useFinancialEntriesList() {
  async function handleRequest() {
    const response = await api.get<ListFinancialEntryResponse[]>(url);
    return response.data;
  }

  const { error, ...rest } = useQuery({
    queryKey: [url],
    queryFn: handleRequest,
  });

  if (error) {
    extractError(error);
  }

  return rest;
}
