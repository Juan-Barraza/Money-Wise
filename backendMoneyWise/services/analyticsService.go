package services

import (
	"fmt"
	"log"
	"moneyWise/dtos"
	"moneyWise/repository"
	"time"
)

type AnalyticsService struct {
	txRepo             *repository.TransactionRepository
	serviceTransaction *TransactionService
}

func NewAnalyticsService(txRepo *repository.TransactionRepository, serviceTran *TransactionService) *AnalyticsService {
	return &AnalyticsService{txRepo: txRepo, serviceTransaction: serviceTran}
}

func (s *AnalyticsService) GetDashboard(userID uint) (*dtos.DashboardResponse, error) {
	now := time.Now()

	monthTx, err := s.serviceTransaction.GetByMonth(userID, now.Year(), now.Month())
	if err != nil {
		return nil, fmt.Errorf("error to get transactions")
	}

	// Calcular totales y breakdown
	var totalIncome, totalExpense float64
	categoryMap := make(map[uint]*dtos.CategoryBreakdown)

	for _, tx := range monthTx {
		if tx.Type == "income" {

			totalIncome += tx.Amount
			log.Printf("count amount income: %d", totalIncome)
		} else {
			totalExpense += tx.Amount
			log.Printf("count amoun expt: %d", totalExpense)

			if _, exists := categoryMap[tx.CategoryID]; !exists {
				categoryMap[tx.CategoryID] = &dtos.CategoryBreakdown{
					CategoryID:   tx.CategoryID,
					CategoryName: tx.Category.Name,
					Icon:         tx.Category.Icon,
					Color:        tx.Category.Color,
				}
			}
			categoryMap[tx.CategoryID].Total += tx.Amount
		}
	}

	var breakdown []dtos.CategoryBreakdown

	for _, cat := range categoryMap {
		if totalExpense > 0 {
			cat.Percentage = (cat.Total / totalExpense) * 100
		}

		breakdown = append(breakdown, *cat)
	}

	return &dtos.DashboardResponse{
		Balance:           totalIncome - totalExpense,
		MonthlyIncome:     totalIncome,
		MonthlyExpense:    totalExpense,
		CategoryBreakdown: breakdown,
		Month:             now.Month().String(),
		Year:              now.Year(),
	}, nil
}
