import type { ClassificationEnum } from "./ClassificationEnum";

export interface GetFinancialEntryResponse {
  id: string;
  date: string;
  amount: number;
  typeId: string;
  classification: ClassificationEnum;
  description: string | null;
}
