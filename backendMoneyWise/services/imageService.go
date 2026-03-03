package services

import (
	"errors"
	"mime/multipart"
	"moneyWise/dtos"
	"moneyWise/models"
	"moneyWise/repository"
)

type ImageService struct {
	imageRepo *repository.ImageRepository
	s3Service *S3Service
}

func NewImageService(imageRepo *repository.ImageRepository, s3Service *S3Service) *ImageService {
	return &ImageService{imageRepo: imageRepo, s3Service: s3Service}
}

func (s *ImageService) Upload(file *multipart.FileHeader, userID uint) (*dtos.ImageResponse, error) {
	// Valida tipo de archivo
	contentType := file.Header.Get("Content-Type")
	allowed := map[string]bool{
		"image/jpeg": true,
		"image/png":  true,
		"image/webp": true,
	}
	if !allowed[contentType] {
		return nil, errors.New("solo se permiten imágenes JPG, PNG o WEBP")
	}

	// Valida tamaño (5MB máx)
	if file.Size > 5*1024*1024 {
		return nil, errors.New("la imagen no puede superar 5MB")
	}

	url, err := s.s3Service.UploadFile(file, "receipts")
	if err != nil {
		return nil, err
	}

	image := &models.Image{
		URL:        url,
		Filename:   file.Filename,
		MimeType:   contentType,
		SizeBytes:  file.Size,
		UploadedBy: userID,
	}

	if err := s.imageRepo.Create(image); err != nil {
		s.s3Service.DeleteFile(url)
		return nil, errors.New("error guardando imagen")
	}

	return &dtos.ImageResponse{
		ID:        image.ID,
		URL:       image.URL,
		Filename:  image.Filename,
		MimeType:  image.MimeType,
		CreatedAt: image.CreatedAt,
	}, nil
}

func (s *ImageService) Delete(id uint) error {
	image, err := s.imageRepo.FindByID(id)
	if err != nil {
		return errors.New("imagen no encontrada")
	}

	// Elimina de S3 primero
	if err := s.s3Service.DeleteFile(image.URL); err != nil {
		return errors.New("error eliminando de S3")
	}

	return s.imageRepo.Delete(id)
}
