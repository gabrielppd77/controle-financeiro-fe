export interface FinancialEntryFilterDto {
  initialDate: string | null;
  finalDate: string | null;
  initialAmount: number | null;
  finalAmount: number | null;
  searchText: string | null;
  typeId: string | null;
  classificationId: string | null;
}
