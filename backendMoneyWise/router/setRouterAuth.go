package router

import (
	"moneyWise/handlers"
	"moneyWise/repository"
	"moneyWise/services"

	"github.com/gofiber/fiber/v3"
	"gorm.io/gorm"
)

func SetRouterAuth(db *gorm.DB, api fiber.Router) {
	userRepo := repository.NewUserRepository(db)
	authService := services.NewAuthService(userRepo)
	authHandler := handlers.NewAuthHandler(authService)

	auth := api.Group("/auth")
	auth.Post("/register", authHandler.Register)
	auth.Post("/login", authHandler.Login)
}
