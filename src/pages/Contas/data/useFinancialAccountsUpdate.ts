import { useMutation } from "@tanstack/react-query";

import type { UpdateFinancialAccountRequest } from "./dtos/UpdateFinancialAccountRequest";

import api from "@libs/api";

import { notifyUpdate } from "@libs/notification";
import { fireError } from "@libs/alert";

interface RequestProps {
  data: UpdateFinancialAccountRequest;
}

export default function useFinancialAccountsUpdate() {
  async function handleRequest({ data }: RequestProps) {
    await api.put("/FinancialAccounts", data);
  }

  return useMutation({
    mutationFn: handleRequest,
    onSuccess: () => notifyUpdate(),
    onError: fireError,
  });
}
