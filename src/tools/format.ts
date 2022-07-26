export const per = (input: number): string => {
  return Intl.NumberFormat("fr-FR", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(input);
};
export const eur = (input: number): string => {
  return Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(Math.round(input / 10) / 100);
};
