package services

import (
	"errors"
	"moneyWise/dtos"
	"moneyWise/repository"
)

type CategoryService struct {
	categoryRepo *repository.CategoryRepository
}

func NewCategoryService(categoryRepo *repository.CategoryRepository) *CategoryService {
	return &CategoryService{categoryRepo: categoryRepo}
}

func (s *CategoryService) GetAll() ([]dtos.CategoryResponse, error) {
	categories, err := s.categoryRepo.FindAll()
	if err != nil {
		return nil, errors.New("error al obtener categorías")
	}

	var response []dtos.CategoryResponse
	for _, cat := range categories {
		response = append(response, dtos.CategoryResponse{
			ID:    cat.ID,
			Name:  cat.Name,
			Icon:  cat.Icon,
			Color: cat.Color,
		})
	}
	return response, nil
}
