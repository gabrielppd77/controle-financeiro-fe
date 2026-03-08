import { useQuery } from "@tanstack/react-query";

import api from "@libs/api";

import { extractError } from "@libs/alert";
import type { ListFinancialEntryResponse } from "./dtos/ListFinancialEntryResponse";

const url = "/FinancialEntries";

export const queryFinancialEntriesList = [url];

export default function useFinancialEntriesList() {
  async function handleRequest() {
    const response = await api.get<ListFinancialEntryResponse[]>(url);
    return response.data;
  }

  const { error, ...rest } = useQuery({
    queryKey: queryFinancialEntriesList,
    queryFn: handleRequest,
  });

  if (error) {
    extractError(error);
  }

  return rest;
}
