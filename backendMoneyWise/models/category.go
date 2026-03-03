package models

import "gorm.io/gorm"

type Category struct {
	gorm.Model
	Name  string `gorm:"size:100;not null;uniqueIndex"`
	Icon  string `gorm:"size:100"`
	Color string `gorm:"size:7"`
}
