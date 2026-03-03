package repository

import (
	"moneyWise/dtos"
	"moneyWise/models"

	"gorm.io/gorm"
)

type TransactionRepository struct {
	db *gorm.DB
}

func NewTransactionRepository(db *gorm.DB) *TransactionRepository {
	return &TransactionRepository{db: db}
}

func (r *TransactionRepository) Create(tx *models.Transaction) error {
	return r.db.Create(tx).Error
}

func (r *TransactionRepository) FindAll(userID uint, filters dtos.TransactionFilters) ([]models.Transaction, int64, error) {
	var transactions []models.Transaction
	var total int64

	if filters.Page <= 0 {
		filters.Page = 1
	}
	if filters.Limit <= 0 {
		filters.Limit = 10
	}
	offset := (filters.Page - 1) * filters.Limit

	query := r.db.Model(&models.Transaction{}).
		Preload("Category").
		Preload("Image").
		Where("user_id = ? AND deleted_at IS NULL", userID).
		Order("date DESC")

	if filters.Type != "" {
		query = query.Where("type = ?", filters.Type)
	}
	if filters.CategoryID != 0 {
		query = query.Where("category_id = ?", filters.CategoryID)
	}
	if filters.Search != "" {
		query = query.Where("LOWER(description) LIKE LOWER(?) OR LOWER(title) LIKE LOWER(?)",
			"%"+filters.Search+"%", "%"+filters.Search+"%")
	}

	if !filters.DateFrom.IsZero() {
		query = query.Where("date >= ?", filters.DateFrom)
	}
	if !filters.DateTo.IsZero() {
		query = query.Where("date <= ?", filters.DateTo)
	}

	query.Count(&total)

	err := query.Limit(filters.Limit).Offset(offset).Find(&transactions).Error
	return transactions, total, err
}

func (r *TransactionRepository) FindByID(id uint, userID uint) (*models.Transaction, error) {
	var tx models.Transaction
	err := r.db.
		Preload("Category").
		Preload("Image").
		Where("id = ? AND user_id = ? AND deleted_at IS NULL", id, userID).
		First(&tx).Error
	if err != nil {
		return nil, err
	}
	return &tx, nil
}

func (r *TransactionRepository) Update(tx *models.Transaction) error {
	return r.db.Save(tx).Error
}

func (r *TransactionRepository) Delete(id uint, userID uint) error {
	return r.db.
		Where("id = ? AND user_id = ?", id, userID).
		Delete(&models.Transaction{}).Error
}
