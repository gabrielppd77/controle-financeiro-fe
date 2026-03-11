import { useQuery } from "@tanstack/react-query";

import api from "@libs/api";

import { fireError } from "@libs/alert";
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
    queryKey: queryClassificationsList,
    queryFn: handleRequest,
    enabled,
  });

  if (error) {
    fireError(error);
  }

  return rest;
}
