import { useQuery } from "@tanstack/react-query";

import api from "@libs/api";

import { fireError } from "@libs/alert";
import type { GetStatisticMonthResponse } from "./dtos/GetStatisticMonthResponse";

const url = "/Dashboards";

const queryDashboards = [url];

interface RequestProps {
  date: string;
}

export default function useDashboards({ date }: RequestProps) {
  async function handleRequest() {
    const response = await api.get<GetStatisticMonthResponse>(url, {
      params: {
        date,
      },
    });
    return response.data;
  }

  const { error, ...rest } = useQuery({
    queryKey: [...queryDashboards, date],
    queryFn: handleRequest,
  });

  if (error) {
    fireError(error);
  }

  return rest;
}
