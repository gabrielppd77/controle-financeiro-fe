export interface ListFinancialEntryResponse {
  id: string;
  date: string;
  amount: number;
  typeId: string;
  typeName: string;
  typeColor: string;
  classificationId: string;
  classificationName: string;
  classificationColor: string | null;
  description: string | null;
}
