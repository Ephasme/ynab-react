import { BudgetDetailResponse } from "ynab";

export const getBudgetById = (token: () => string, budgetId: string) =>
  fetch(`https://api.youneedabudget.com/v1/budgets/${budgetId}`, {
    headers: {
      Authorization: `Bearer ${token()}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json() as Promise<BudgetDetailResponse>)
    .then((result) => result.data.budget);
