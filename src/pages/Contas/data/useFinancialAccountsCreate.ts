import { useMutation } from "@tanstack/react-query";

import type { CreateFinancialAccountRequest } from "./dtos/CreateFinancialAccountRequest";

import api from "@libs/api";

import { notifyCreate } from "@libs/notification";
import { fireError } from "@libs/alert";

interface RequestProps {
  data: CreateFinancialAccountRequest;
}

export default function useFinancialAccountsCreate() {
  async function handleRequest({ data }: RequestProps) {
    await api.post("/FinancialAccounts", data);
  }

  return useMutation({
    mutationFn: handleRequest,
    onSuccess: () => notifyCreate(),
    onError: fireError,
  });
}
