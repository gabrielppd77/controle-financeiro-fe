import { useQuery } from "@tanstack/react-query";

import api from "@libs/api";

import { extractError } from "@libs/alert";
import type { ClassificationResponse } from "./dtos/ClassificationResponse";

const url = "/Classifications";

export const queryClassificationsList = [url];

interface RequestProps {
  enabled: boolean;
}

export default function useClassificationsList({ enabled }: RequestProps) {
  async function handleRequest() {
    const response = await api.get<ClassificationResponse[]>(url);
    return response.data;
  }

  const { error, ...rest } = useQuery({
    queryKey: [url],
    queryFn: handleRequest,
    enabled,
  });

  if (error) {
    extractError(error);
  }

  return rest;
}
