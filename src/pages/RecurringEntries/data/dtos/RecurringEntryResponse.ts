export interface RecurringEntryResponse {
  id: string;
  description: string | null;
  amount: number;
  classification: string;
  dayOfMonth: number;
  startDate: string;
  endDate: string | null;
  isActive: boolean;
  typeId: string;
  accountId: string | null;
}
