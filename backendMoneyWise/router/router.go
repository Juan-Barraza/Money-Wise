package router

import (
	"database/sql"

	"github.com/gofiber/fiber/v3"
)

func SetUpRouters(db *sql.DB, app *fiber.App) {
	apiV1 := app.Group("/api/v1")
	SetRouterHealth(apiV1)

}
