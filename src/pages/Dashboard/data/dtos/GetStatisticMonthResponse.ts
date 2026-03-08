import type { ChartDataOfYearDto } from "./ChartDataOfYearDto";
import type { GetStatisticMonthItemResponse } from "./GetStatisticMonthItemResponse";

export interface GetStatisticMonthResponse {
  types: GetStatisticMonthItemResponse[];
  classifications: GetStatisticMonthItemResponse[];
  classificationsOfYear: ChartDataOfYearDto[];
}
