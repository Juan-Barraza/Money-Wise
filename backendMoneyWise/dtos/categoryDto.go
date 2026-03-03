package dtos

type CategoryResponse struct {
	ID    uint   `json:"id"`
	Name  string `json:"name"`
	Icon  string `json:"icon"`
	Color string `json:"color"`
}
