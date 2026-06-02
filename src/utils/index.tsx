import dayjs, { Dayjs } from "dayjs";

export function formatMoney(value: number | null | undefined) {
  if (!value) return "";

  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDateToShow(value: string | null | undefined) {
  if (!value) return "";
  return dayjs(value, "YYYY-MM-DD").format("DD/MM/YYYY");
}

export function formatDate(value: Dayjs | null): string {
  if (!value) return "Data inválida";
  return value.format("YYYY-MM-DD");
}

export function todayDate() {
  return formatDate(dayjs());
}

export function startOfMonth() {
  return formatDate(dayjs().startOf("month"));
}

export function endOfMonth() {
  return formatDate(dayjs().endOf("month"));
}

export function formatToDayjs(value: string | null) {
  return dayjs(value);
}
