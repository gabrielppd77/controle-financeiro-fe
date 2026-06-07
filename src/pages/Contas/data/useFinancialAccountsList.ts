import { useQuery } from "@tanstack/react-query";

import api from "@libs/api";

import type { FinancialAccountResponse } from "./dtos/FinancialAccountResponse";
import { fireError } from "@libs/alert";

const url = "/FinancialAccounts";

export const queryFinancialAccountsList = [url];

interface RequestProps {
  enabled: boolean;
}

export default function useFinancialAccountsList({ enabled }: RequestProps) {
  async function handleRequest() {
    const response = await api.get<FinancialAccountResponse[]>(url);
    return response.data;
  }

  const { error, ...rest } = useQuery({
    queryKey: queryFinancialAccountsList,
    queryFn: handleRequest,
    enabled,
  });

  if (error) {
    fireError(error);
  }

  return rest;
}
