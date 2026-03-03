package services

import (
	"context"
	"fmt"
	"mime/multipart"
	"moneyWise/config"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type S3Service struct{}

func NewS3Service() *S3Service {
	return &S3Service{}
}

func (s *S3Service) UploadFile(file *multipart.FileHeader, folder string) (string, error) {
	src, err := file.Open()
	if err != nil {
		return "", fmt.Errorf("error abriendo archivo: %w", err)
	}
	defer src.Close()

	ext := filepath.Ext(file.Filename)
	key := fmt.Sprintf("%s/%d%s", folder, time.Now().UnixNano(), ext)

	contentType := file.Header.Get("Content-Type")
	if contentType == "" {
		contentType = "application/octet-stream"
	}

	_, err = config.S3Client.PutObject(context.TODO(), &s3.PutObjectInput{
		Bucket:      aws.String(os.Getenv("AWS_BUCKET_NAME")),
		Key:         aws.String(key),
		Body:        src,
		ContentType: aws.String(contentType),
	})
	if err != nil {
		return "", fmt.Errorf("error subiendo a S3: %w", err)
	}

	url := fmt.Sprintf("https://%s.s3.%s.amazonaws.com/%s",
		os.Getenv("AWS_BUCKET_NAME"),
		os.Getenv("AWS_REGION"),
		key,
	)
	return url, nil
}

func (s *S3Service) DeleteFile(url string) error {
	// Extrae el key de la URL
	bucket := os.Getenv("AWS_BUCKET_NAME")
	region := os.Getenv("AWS_REGION")
	prefix := fmt.Sprintf("https://%s.s3.%s.amazonaws.com/", bucket, region)
	key := strings.TrimPrefix(url, prefix)

	_, err := config.S3Client.DeleteObject(context.TODO(), &s3.DeleteObjectInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(key),
	})
	return err
}
