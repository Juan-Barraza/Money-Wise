package services

import (
	"errors"
	"moneyWise/dtos"
	"moneyWise/models"
	"moneyWise/repository"
	"time"
)

type TransactionService struct {
	txRepo *repository.TransactionRepository
}

func NewTransactionService(txRepo *repository.TransactionRepository) *TransactionService {
	return &TransactionService{txRepo: txRepo}
}

func (s *TransactionService) GetAll(userID uint, filters dtos.TransactionFilters) (*dtos.PaginatedTransactions, error) {
	transactions, total, err := s.txRepo.FindAll(userID, filters)
	if err != nil {
		return nil, errors.New("error al obtener transacciones")
	}

	if filters.Limit <= 0 {
		filters.Limit = 10
	}

	if filters.Page <= 0 {
		filters.Page = 1
	}

	var response []dtos.TransactionResponse
	for _, tx := range transactions {
		response = append(response, mapToResponse(tx))
	}

	if response == nil {
		response = []dtos.TransactionResponse{}
	}
	totalPages := 1
	if total > 0 && filters.Limit > 0 {
		totalPages = int(total) / filters.Limit
		if int(total)%filters.Limit != 0 {
			totalPages++
		}

	}
	return &dtos.PaginatedTransactions{
		Data:       response,
		Total:      total,
		Page:       filters.Page,
		Limit:      filters.Limit,
		TotalPages: totalPages,
	}, nil
}

func (s *TransactionService) GetOne(id uint, userID uint) (*dtos.TransactionResponse, error) {
	tx, err := s.txRepo.FindByID(id, userID)
	if err != nil {
		return nil, errors.New("transacción no encontrada")
	}
	res := mapToResponse(*tx)
	return &res, nil
}

func (s *TransactionService) Create(userID uint, req dtos.CreateTransactionRequest) (*dtos.TransactionResponse, error) {
	tx := &models.Transaction{
		UserID:      userID,
		CategoryID:  req.CategoryID,
		ImageID:     req.ImageID,
		Type:        req.Type,
		Title:       req.Title,
		Description: req.Description,
		Amount:      req.Amount,
		Date:        req.Date,
	}

	if err := s.txRepo.Create(tx); err != nil {
		return nil, errors.New("error al crear la transacción")
	}

	// Recargar con relaciones
	created, err := s.txRepo.FindByID(tx.ID, userID)
	if err != nil {
		return nil, err
	}
	res := mapToResponse(*created)
	return &res, nil
}

func (s *TransactionService) Update(id uint, userID uint, req dtos.UpdateTransactionRequest) (*dtos.TransactionResponse, error) {
	tx, err := s.txRepo.FindByID(id, userID)
	if err != nil {
		return nil, errors.New("transacción no encontrada")
	}

	if req.CategoryID != nil {
		tx.CategoryID = *req.CategoryID
	}
	if req.ImageID != nil {
		tx.ImageID = req.ImageID
	}
	if req.Type != nil {
		tx.Type = *req.Type
	}
	if req.Title != nil {
		tx.Title = *req.Title
	}
	if req.Description != nil {
		tx.Description = *req.Description
	}
	if req.Amount != nil {
		tx.Amount = *req.Amount
	}
	if req.Date != nil {
		tx.Date = *req.Date
	}

	if err := s.txRepo.Update(tx); err != nil {
		return nil, errors.New("error al actualizar la transacción")
	}

	updated, err := s.txRepo.FindByID(tx.ID, userID)
	if err != nil {
		return nil, err
	}
	res := mapToResponse(*updated)
	return &res, nil
}

func (s *TransactionService) Delete(id uint, userID uint) error {
	_, err := s.txRepo.FindByID(id, userID)
	if err != nil {
		return errors.New("transacción no encontrada")
	}

	return s.txRepo.Delete(id, userID)
}

func mapToResponse(tx models.Transaction) dtos.TransactionResponse {
	res := dtos.TransactionResponse{
		ID:          tx.ID,
		Type:        tx.Type,
		Title:       tx.Title,
		Description: tx.Description,
		Amount:      tx.Amount,
		Date:        tx.Date,
		CreatedAt:   tx.CreatedAt,
		Category: dtos.CategoryResponse{
			ID:    tx.Category.ID,
			Name:  tx.Category.Name,
			Icon:  tx.Category.Icon,
			Color: tx.Category.Color,
		},
	}

	if tx.Image != nil {
		res.Image = &dtos.ImageResponse{
			ID:        tx.Image.ID,
			URL:       tx.Image.URL,
			Filename:  tx.Image.Filename,
			MimeType:  tx.Image.MimeType,
			CreatedAt: tx.Image.CreatedAt,
		}
	}

	return res
}

func (s *TransactionService) GetByMonth(userID uint, year int, month time.Month) ([]models.Transaction, error) {
	start := time.Date(year, month, 1, 0, 0, 0, 0, time.UTC)
	end := start.AddDate(0, 1, 0)

	filters := dtos.TransactionFilters{
		DateFrom: start,
		DateTo:   end,
		Limit:    1000,
	}
	transactions, _, err := s.txRepo.FindAll(userID, filters)

	return transactions, err
}
