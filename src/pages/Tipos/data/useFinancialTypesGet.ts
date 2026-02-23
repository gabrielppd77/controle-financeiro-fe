import { useQuery } from "@tanstack/react-query";

import api from "@libs/api";

import type { FinancialTypeResponse } from "./dtos/FinancialTypeResponse";
import { extractError } from "@libs/alert";

export default function useFinancialTypesGet(id?: string) {
  const url = `/FinancialTypes/${id || ""}`;

  async function handleRequest() {
    const response = await api.get<FinancialTypeResponse>(url);
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
