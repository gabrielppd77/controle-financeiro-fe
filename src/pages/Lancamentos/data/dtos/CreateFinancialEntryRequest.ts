export interface CreateFinancialEntryRequest {
  date: string;
  amount: number;
  typeId: string;
  classificationId: string;
  description: string | null;
}
