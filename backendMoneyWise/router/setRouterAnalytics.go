package router

import (
	"moneyWise/handlers"
	"moneyWise/repository"
	"moneyWise/services"

	"github.com/gofiber/fiber/v3"
	"gorm.io/gorm"
)

func SetRouterAnalytics(db *gorm.DB, api fiber.Router) {
	txRepo := repository.NewTransactionRepository(db)
	servicesTransaction := services.NewTransactionServiceBasic(txRepo)
	analyticsService := services.NewAnalyticsService(txRepo, servicesTransaction)
	analyticsHandler := handlers.NewAnalyticsHandler(analyticsService)

	analytics := api.Group("/analytics")
	analytics.Get("/dashboard", analyticsHandler.GetDashboard)
}
