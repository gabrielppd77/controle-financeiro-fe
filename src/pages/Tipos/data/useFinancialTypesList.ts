import { useQuery } from "@tanstack/react-query";

import api from "@libs/api";

import type { FinancialTypeResponse } from "./dtos/FinancialTypeResponse";
import { extractError } from "@libs/alert";

const url = "/FinancialTypes";

export const queryFinancialTypesList = [url];

interface RequestProps {
  enabled: boolean;
}

export default function useFinancialTypesList({ enabled }: RequestProps) {
  async function handleRequest() {
    const response = await api.get<FinancialTypeResponse[]>(url);
    return response.data;
  }

  const { error, ...rest } = useQuery({
    queryKey: queryFinancialTypesList,
    queryFn: handleRequest,
    enabled,
  });

  if (error) {
    extractError(error);
  }

  return rest;
}
