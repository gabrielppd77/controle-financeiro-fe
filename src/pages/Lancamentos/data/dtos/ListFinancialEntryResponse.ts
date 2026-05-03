import type { ClassificationEnum } from "./ClassificationEnum";

export interface ListFinancialEntryResponse {
  id: string;
  date: string;
  amount: number;
  typeId: string;
  typeName: string;
  typeColor: string;
  classification: ClassificationEnum;
  classificationName: string;
  classificationColor: string | null;
  description: string | null;
}
