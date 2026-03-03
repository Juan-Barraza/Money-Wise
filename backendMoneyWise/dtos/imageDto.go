package dtos

import "time"

type UploadImageRequest struct {
	URL      string `json:"url" binding:"required"`
	Filename string `json:"filename"`
	MimeType string `json:"mime_type"`
	Size     int64  `json:"size_bytes"`
}

type ImageResponse struct {
	ID        uint      `json:"id"`
	URL       string    `json:"url"`
	Filename  string    `json:"filename"`
	MimeType  string    `json:"mime_type"`
	CreatedAt time.Time `json:"created_at"`
}
