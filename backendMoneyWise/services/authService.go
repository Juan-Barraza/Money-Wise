package services

import (
	"errors"
	"moneyWise/dtos"
	"moneyWise/models"
	"moneyWise/repository"
	"moneyWise/utils"

	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	userRepo *repository.UserRepository
}

func NewAuthService(userRepo *repository.UserRepository) *AuthService {
	return &AuthService{userRepo: userRepo}
}

func (s *AuthService) Register(req dtos.RegisterRequest) (*dtos.AuthResponse, error) {
	existing, _ := s.userRepo.FindByEmail(req.Email)
	if existing != nil {
		return nil, errors.New("el email ya está registrado")
	}

	// Hashear password
	hashed, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, errors.New("error al procesar la contraseña")
	}

	user := &models.User{
		Name:     req.Name,
		LastName: req.LastName,
		Email:    req.Email,
		Password: string(hashed),
		IsActive: true,
	}

	if err := s.userRepo.Create(user); err != nil {
		return nil, errors.New("error al crear el usuario")
	}

	token, err := utils.GenerateJWT(user.ID, user.Email)
	if err != nil {
		return nil, errors.New("error al generar el token")
	}

	return &dtos.AuthResponse{
		Token: token,
		User: dtos.UserResponse{
			ID:       user.ID,
			Name:     user.Name,
			LastName: user.LastName,
			Email:    user.Email,
		},
	}, nil
}

func (s *AuthService) Login(req dtos.LoginRequest) (*dtos.AuthResponse, error) {
	user, err := s.userRepo.FindByEmail(req.Email)
	if err != nil {
		return nil, errors.New("credenciales inválidas")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		return nil, errors.New("credenciales inválidas")
	}

	token, err := utils.GenerateJWT(user.ID, user.Email)
	if err != nil {
		return nil, errors.New("error al generar el token")
	}

	return &dtos.AuthResponse{
		Token: token,
		User: dtos.UserResponse{
			ID:       user.ID,
			Name:     user.Name,
			LastName: user.LastName,
			Email:    user.Email,
		},
	}, nil
}
