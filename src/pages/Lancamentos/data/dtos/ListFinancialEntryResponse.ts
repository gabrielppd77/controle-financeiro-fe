export interface ListFinancialEntryResponse {
  id: string;
  date: string;
  amount: number;
  typeId: string;
  typeName: string;
  classificationId: string;
  classificationName: string;
  description: string | null;
}
