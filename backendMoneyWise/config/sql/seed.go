package sql

import (
	"log"
	"moneyWise/models"

	"gorm.io/gorm"
)

func SeedCategories(db *gorm.DB) {
	categories := []models.Category{
		{Name: "Alimentación", Icon: "fast-food-outline", Color: "#FF6B6B"},
		{Name: "Transporte", Icon: "car-outline", Color: "#4ECDC4"},
		{Name: "Vivienda", Icon: "home-outline", Color: "#45B7D1"},
		{Name: "Salud", Icon: "medkit-outline", Color: "#96CEB4"},
		{Name: "Ocio", Icon: "game-controller-outline", Color: "#FFEAA7"},
		{Name: "Salario", Icon: "cash-outline", Color: "#6C5CE7"},
		{Name: "Otros", Icon: "ellipsis-horizontal-outline", Color: "#B2BEC3"},
	}

	for _, cat := range categories {
		db.FirstOrCreate(&cat, models.Category{Name: cat.Name})
	}

	log.Println("Categories seeded ✓")
}
