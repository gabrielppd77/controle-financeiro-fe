import { useQuery } from "@tanstack/react-query";

import api from "@libs/api";

import type { ClassificationResponse } from "./dtos/ClassificationResponse";
import { extractError } from "@libs/alert";

export default function useClassificationsGet(id?: string) {
  const url = `/Classifications/${id || ""}`;

  async function handleRequest() {
    const response = await api.get<ClassificationResponse>(url);
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
