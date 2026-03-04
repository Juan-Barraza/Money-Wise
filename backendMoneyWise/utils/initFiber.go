package utils

import (
	"encoding/json"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
)

func InitFiber() (*fiber.App, error) {
	appFiber := fiber.New(fiber.Config{
		JSONEncoder:   json.Marshal,
		JSONDecoder:   json.Unmarshal,
		CaseSensitive: true,
		StrictRouting: false,
		ServerHeader:  "MoneyWise",
	})

	appFiber.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:8100", // Ionic dev
			"capacitor://localhost", // app móvil
			"ionic://localhost",
		},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
	}))

	return appFiber, nil
}
