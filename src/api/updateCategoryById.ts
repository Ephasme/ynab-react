export const useUpdateCategoryById = (
  token: string,
  params: { month: string; budgetId: string; categoryId: string },
  budgetedAmount: number
) =>
  fetch(
    `https://api.youneedabudget.com/v1/budgets/${params.budgetId}/month/${params.month}/categories/${params.categoryId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: {
          budgeted: budgetedAmount,
        },
      }),
    }
  );
