import { useQuery } from "@tanstack/react-query";

import api from "@libs/api";

import { fireError } from "@libs/alert";
import type { ListFinancialEntryResponse } from "./dtos/ListFinancialEntryResponse";
import type { FinancialEntryFilterDto } from "./dtos/FinancialEntryFilterDto";

const url = "/FinancialEntries/List";

export const queryFinancialEntriesList = [url];

interface RequestProps {
  data: FinancialEntryFilterDto;
}

export default function useFinancialEntriesList({ data }: RequestProps) {
  async function handleRequest() {
    const response = await api.post<ListFinancialEntryResponse[]>(url, data);
    return response.data;
  }

  const { error, ...rest } = useQuery({
    queryKey: [...queryFinancialEntriesList, data],
    queryFn: handleRequest,
  });

  if (error) {
    fireError(error);
  }

  return rest;
}
