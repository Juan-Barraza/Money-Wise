package router

import (
	"moneyWise/handlers"
	"moneyWise/repository"
	"moneyWise/services"

	"github.com/gofiber/fiber/v3"
	"gorm.io/gorm"
)

func SetRouterTransaction(db *gorm.DB, api fiber.Router) {
	txRepo := repository.NewTransactionRepository(db)
	imageRepo := repository.NewImageRepository(db)
	s3Service := services.NewS3Service()
	txService := services.NewTransactionService(txRepo, imageRepo, s3Service)
	txHandler := handlers.NewTransactionHandler(txService)

	tx := api.Group("/transactions")
	tx.Get("/", txHandler.GetAll)
	tx.Post("/", txHandler.Create)
	tx.Get("/:id", txHandler.GetOne)
	tx.Put("/:id", txHandler.Update)
	tx.Delete("/:id", txHandler.Delete)

}
