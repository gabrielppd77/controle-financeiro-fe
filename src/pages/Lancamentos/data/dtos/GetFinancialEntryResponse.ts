export interface GetFinancialEntryResponse {
  id: string;
  date: string;
  amount: number;
  typeId: string;
  classificationId: string;
  description?: string | null;
}
