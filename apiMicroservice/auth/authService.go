package auth

import (
	"golang.org/x/crypto/bcrypt"
)

func GetUserByNISN(nisn string) (models.User, error) {
	var user models.User
	err := database.DB.Preload("Kelas").Where("nisn = ?", nisn).First(&user).Error
	return user, err
}

func ComparePassword(hashedPassword, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}
