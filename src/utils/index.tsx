export function formatMoney(value: number | null | undefined) {
  if (!value) return "";

  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDate(value: string | null | undefined) {
  if (!value) return "";

  return new Intl.DateTimeFormat("pt-BR").format(new Date(value));
}
