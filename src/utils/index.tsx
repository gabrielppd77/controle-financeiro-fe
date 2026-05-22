import dayjs, { Dayjs } from "dayjs";

export function formatMoney(value: number | null | undefined) {
  if (!value) return "";

  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDate(value: string | null | undefined) {
  if (!value) return "";

  return dayjs(value, "YYYY-MM-DD").format("DD/MM/YYYY");
}

export function todayDate() {
  return dayjs().toISOString();
}

export function startOfMonth() {
  return dayjs().startOf("month").toISOString();
}

export function endOfMonth() {
  return dayjs().endOf("month").toISOString();
}

export function changeFormatter(value: Dayjs | null): string | null {
  if (!value) return null;
  return value.format("YYYY-MM-DD");
}

export function valueFormatter(value: string | null) {
  if (!value) return null;
  return dayjs(value);
}
