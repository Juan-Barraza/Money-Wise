package dtos

type CategoryBreakdown struct {
	CategoryID   uint    `json:"category_id"`
	CategoryName string  `json:"category_name"`
	Icon         string  `json:"icon"`
	Color        string  `json:"color"`
	Total        float64 `json:"total"`
	Percentage   float64 `json:"percentage"`
}

type DashboardResponse struct {
	Balance           float64             `json:"balance"`
	MonthlyIncome     float64             `json:"monthly_income"`
	MonthlyExpense    float64             `json:"monthly_expense"`
	CategoryBreakdown []CategoryBreakdown `json:"category_breakdown"`
	Month             string              `json:"month"`
	Year              int                 `json:"year"`
}
