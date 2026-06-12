export interface CreateRecurringEntryRequest {
  description: string | null;
  amount: number;
  classification: string;
  dayOfMonth: number;
  startDate: string;
  endDate: string | null;
  typeId: string;
  accountId: string | null;
}
