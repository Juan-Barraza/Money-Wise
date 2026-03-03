package models

import (
	"time"

	"gorm.io/gorm"
)

type Transaction struct {
	gorm.Model
	UserID      uint     `gorm:"not null;index"`
	User        User     `gorm:"foreignKey:UserID"`
	CategoryID  uint     `gorm:"not null"`
	Category    Category `gorm:"foreignKey:CategoryID"`
	ImageID     *uint
	Image       *Image `gorm:"foreignKey:ImageID"`
	Type        string `gorm:"type:varchar(10);not null"` // income | expense
	Title       string `gorm:"size:150;not null"`
	Description string
	Amount      float64   `gorm:"type:numeric(12,2);not null;check:amount > 0"`
	Date        time.Time `gorm:"not null"`
}
