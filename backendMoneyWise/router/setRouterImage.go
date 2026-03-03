package router

import (
	"moneyWise/handlers"
	"moneyWise/repository"
	"moneyWise/services"

	"github.com/gofiber/fiber/v3"
	"gorm.io/gorm"
)

func SetRouterImage(db *gorm.DB, api fiber.Router) {
	imageRepo := repository.NewImageRepository(db)
	s3Service := services.NewS3Service()
	imageService := services.NewImageService(imageRepo, s3Service)
	imageHandler := handlers.NewImageHandler(imageService)

	img := api.Group("/images")
	img.Post("/", imageHandler.Upload)
	img.Delete("/:id", imageHandler.Delete)

}
