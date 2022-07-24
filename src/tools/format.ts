export const per = (input: number): number => {
  return Math.round(input * 10000) / 100;
};
export const eur = (input: number): number => {
  return Math.round(input / 10) / 100;
};
