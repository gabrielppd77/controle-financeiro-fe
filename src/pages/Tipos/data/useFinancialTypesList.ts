import { useQuery } from "@tanstack/react-query";

import api from "@libs/api";

import type { ListFinancialTypeResponse } from "./dtos/ListFinancialTypeResponse";
import { extractError } from "@libs/alert";

const url = "/FinancialTypes";

export const queryFinancialTypesList = [url];

export default function useFinancialTypesList() {
  async function handleRequest() {
    const response = await api.get<ListFinancialTypeResponse[]>(url);
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
