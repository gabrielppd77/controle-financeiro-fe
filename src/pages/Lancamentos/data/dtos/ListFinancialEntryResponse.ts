import type { ClassificationEnum } from "./ClassificationEnum";

export interface ListFinancialEntryResponse {
  id: string;
  date: string;
  amount: number;
  typeId: string | null;
  typeName: string | null;
  typeColor: string | null;
  accountId: string | null;
  accountName: string | null;
  accountColor: string | null;
  classification: ClassificationEnum;
  classificationName: string;
  classificationColor: string | null;
  description: string | null;
  isConfirmed: boolean;
}
