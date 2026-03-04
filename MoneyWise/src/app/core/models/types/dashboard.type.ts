
export interface ICategoryBreakDown {
  category_id: number;
  category_name: string;
  icon: string;
  color: string;
  total: number;
  percentage: number;
}

export interface DashboardResponse {
  balance: number;
  monthly_income: number,
  monthly_expense: number,
  category_breakdown: ICategoryBreakDown[];
  month: string;
  year: number;
}
