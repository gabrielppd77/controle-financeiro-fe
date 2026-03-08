import type { GetStatisticMonthItemResponse } from "./GetStatisticMonthItemResponse";

export interface GetStatisticMonthResponse {
  types: GetStatisticMonthItemResponse[];
  classifications: GetStatisticMonthItemResponse[];
}
