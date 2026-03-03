package router

import (
	"moneyWise/handlers"
	"moneyWise/repository"
	"moneyWise/services"

	"github.com/gofiber/fiber/v3"
	"gorm.io/gorm"
)

func SetRouterCategory(db *gorm.DB, api fiber.Router) {
	categoryRepo := repository.NewCategoryRepository(db)
	categoryService := services.NewCategoryService(categoryRepo)
	categoryHandler := handlers.NewCategoryHandler(categoryService)

	cat := api.Group("/categories")
	cat.Get("/", categoryHandler.GetAll)
}
