import { useQuery } from "@tanstack/react-query";

import api from "@libs/api";

import type { FinancialAccountResponse } from "./dtos/FinancialAccountResponse";
import { fireError } from "@libs/alert";

export default function useFinancialAccountsGet(id?: string) {
  const url = `/FinancialAccounts/${id || ""}`;

  async function handleRequest() {
    const response = await api.get<FinancialAccountResponse>(url);
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
