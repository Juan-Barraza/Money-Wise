package dtos

import "time"

type CreateTransactionRequest struct {
	CategoryID  uint      `json:"category_id" binding:"required"`
	ImageID     *uint     `json:"image_id"`
	Type        string    `json:"type" binding:"required,oneof=income expense"`
	Title       string    `json:"title" binding:"required"`
	Description string    `json:"description"`
	Amount      float64   `json:"amount" binding:"required,gt=0"`
	Date        time.Time `json:"date" binding:"required"`
}

type UpdateTransactionRequest struct {
	CategoryID  *uint      `json:"category_id"`
	ImageID     *uint      `json:"image_id,omitempty"`
	Type        *string    `json:"type" binding:"omitempty,oneof=income expense"`
	Title       *string    `json:"title"`
	Description *string    `json:"description"`
	Amount      *float64   `json:"amount" binding:"omitempty,gt=0"`
	Date        *time.Time `json:"date"`
}

type TransactionResponse struct {
	ID          uint             `json:"id"`
	Type        string           `json:"type"`
	Title       string           `json:"title"`
	Description string           `json:"description"`
	Amount      float64          `json:"amount"`
	Date        time.Time        `json:"date"`
	Category    CategoryResponse `json:"category"`
	Image       *ImageResponse   `json:"image,omitempty"`
	CreatedAt   time.Time        `json:"created_at"`
}

type TransactionFilters struct {
	Type       string    `form:"type"`
	CategoryID uint      `form:"category_id"`
	Search     string    `form:"search"`
	DateFrom   time.Time `form:"date_from"`
	DateTo     time.Time `form:"date_to"`
	Page       int       `form:"page"`
	Limit      int       `form:"limit"`
}

type PaginatedTransactions struct {
	Data       []TransactionResponse `json:"data"`
	Total      int64                 `json:"total"`
	Page       int                   `json:"page"`
	Limit      int                   `json:"limit"`
	TotalPages int                   `json:"total_pages"`
}
