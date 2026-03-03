package router

import "github.com/gofiber/fiber/v3"

type Message struct {
	Message string `json:"message"`
}

func SetRouterHealth(apiV1 fiber.Router) {

	apiV1.Get("/health", func(ctx fiber.Ctx) error {
		return ctx.Status(200).JSON(Message{Message: "Is OK"})
	})
}
