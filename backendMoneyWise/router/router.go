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

	protected := apiV1.Group("/", middleware.AuthRequired())
	SetRouterTransaction(db, protected)
	SetRouterImage(db, protected)
	SetRouterCategory(db, protected)

}
