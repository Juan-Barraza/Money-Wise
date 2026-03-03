package repository

import (
	"moneyWise/models"

	"gorm.io/gorm"
)

type ImageRepository struct {
	db *gorm.DB
}

func NewImageRepository(db *gorm.DB) *ImageRepository {
	return &ImageRepository{db: db}
}

func (r *ImageRepository) Create(image *models.Image) error {
	return r.db.Create(image).Error
}

func (r *ImageRepository) FindByID(id uint) (*models.Image, error) {
	var image models.Image
	err := r.db.First(&image, id).Error
	if err != nil {
		return nil, err
	}
	return &image, nil
}

func (r *ImageRepository) Delete(id uint) error {
	return r.db.Delete(&models.Image{}, id).Error
}
