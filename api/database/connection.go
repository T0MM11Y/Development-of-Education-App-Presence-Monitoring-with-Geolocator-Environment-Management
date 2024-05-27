package database

import (
	"API/models"
	"errors"

	"golang.org/x/crypto/bcrypt"
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
	connection.AutoMigrate(&models.Admin{})
	connection.AutoMigrate(&models.Kelas{})
	connection.AutoMigrate(&models.User{})
	connection.AutoMigrate(&models.Pengajar{})
	connection.AutoMigrate(&models.Roster{})
	connection.AutoMigrate(&models.Pengumuman{})
	connection.AutoMigrate(&models.TanyaJawab{})
	connection.AutoMigrate(&models.Absensi{})
	SeedAdmin()

}

func SeedAdmin() {
	var admin models.Admin
	if err := DB.First(&admin).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			hashedPassword, err := bcrypt.GenerateFromPassword([]byte("admin"), bcrypt.DefaultCost)
			if err != nil {
				panic("Failed to hash password")
			}
			admin = models.Admin{
				Username: "admin",
				Password: hashedPassword,
			}
			DB.Save(&admin)
		} else {
			panic("Failed to query for admin")
		}
	}
}
