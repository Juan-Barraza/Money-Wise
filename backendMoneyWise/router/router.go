package router

import (
	"moneyWise/middleware"

	"github.com/gofiber/fiber/v3"
	"gorm.io/gorm"
)

func SetUpRouters(db *gorm.DB, app *fiber.App) {
	apiV1 := app.Group("/api/v1")
	SetRouterHealth(apiV1)
	SetRouterAuth(db, apiV1)

	protected := app.Group("/", middleware.AuthRequired())
	_ = protected

}
