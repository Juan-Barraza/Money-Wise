package models

import "gorm.io/gorm"

type Image struct {
	gorm.Model
	URL        string `gorm:"not null"`
	Filename   string `gorm:"size:255"`
	MimeType   string `gorm:"size:50"`
	SizeBytes  int64
	UploadedBy uint
	User       User `gorm:"foreignKey:UploadedBy"`
}
