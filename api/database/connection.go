package database

import (
	"API/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	connection, err := gorm.Open(mysql.Open("root:@/parmaksianschool"), &gorm.Config{})
	if err != nil {
		panic("Could not connect to the database")

	}
	DB = connection
	connection.AutoMigrate(&models.User{})
	connection.AutoMigrate(&models.Admin{})
}
