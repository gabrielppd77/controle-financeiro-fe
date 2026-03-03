import { useQuery } from "@tanstack/react-query";

import api from "@libs/api";

import type { GetFinancialEntryResponse } from "./dtos/GetFinancialEntryResponse";
import { extractError } from "@libs/alert";

export default function useFinancialEntriesGet(id?: string) {
  const url = `/FinancialEntries/${id || ""}`;

  async function handleRequest() {
    const response = await api.get<GetFinancialEntryResponse>(url);
    return response.data;
  }

  const { error, ...rest } = useQuery({
    queryKey: [url],
    queryFn: handleRequest,
    enabled: !!id,
  });

  if (error) {
    extractError(error);
  }

  return rest;
}
