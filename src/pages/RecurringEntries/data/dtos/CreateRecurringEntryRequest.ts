import type { ClassificationEnum } from "@pages/Lancamentos/data/dtos/ClassificationEnum";

export interface CreateRecurringEntryRequest {
  description: string | null;
  amount: number;
  classification: ClassificationEnum;
  dayOfMonth: number;
  startDate: string;
  endDate: string | null;
  typeId: string;
  accountId: string | null;
}
