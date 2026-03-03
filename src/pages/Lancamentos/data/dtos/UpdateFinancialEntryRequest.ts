export interface UpdateFinancialEntryRequest {
  id: string;
  date: string;
  amount: number;
  typeId: string;
  classificationId: string;
  description?: string | null;
}
