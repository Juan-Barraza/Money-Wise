package router

import (
	"github.com/gofiber/fiber/v3"
	"gorm.io/gorm"
)

func SetUpRouters(db *gorm.DB, app *fiber.App) {
	apiV1 := app.Group("/api/v1")
	SetRouterHealth(apiV1)

}
