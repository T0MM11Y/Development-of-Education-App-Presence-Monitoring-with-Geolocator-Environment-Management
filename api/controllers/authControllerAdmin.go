package controllers

import (
	"API/database"
	"API/models"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

const SecretKeyAdmin = "secret"

func RegisterAdmin(c *fiber.Ctx) error {
<<<<<<< HEAD
	data := new(map[string]string)

	if err := c.BodyParser(data); err != nil {
		return err
	}

	password, _ := bcrypt.GenerateFromPassword([]byte((*data)["password"]), 14)

	admin := models.Admin{
		Username: (*data)["username"],
=======
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)

	admin := models.Admin{
		Username: data["username"],
>>>>>>> dadfa54d8df01e586933f0bcb5ea5f6c7fa2e608
		Password: password,
	}
	database.DB.Create(&admin)

	return c.JSON(admin)
}
<<<<<<< HEAD

func LoginAdmin(c *fiber.Ctx) error {
	data := new(map[string]string)

	if err := c.BodyParser(data); err != nil {
=======
func LoginAdmin(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
>>>>>>> dadfa54d8df01e586933f0bcb5ea5f6c7fa2e608
		return err
	}

	var admin models.Admin

<<<<<<< HEAD
	database.DB.Where("username = ?", (*data)["username"]).First(&admin)
=======
	database.DB.Where("username = ?", data["username"]).First(&admin)
>>>>>>> dadfa54d8df01e586933f0bcb5ea5f6c7fa2e608

	if admin.ID == 0 { //gakbisa nemukan admin
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "User not found",
		})
	}
<<<<<<< HEAD
	if err := bcrypt.CompareHashAndPassword(admin.Password, []byte((*data)["password"])); err != nil {
=======
	if err := bcrypt.CompareHashAndPassword(admin.Password, []byte(data["password"])); err != nil {
>>>>>>> dadfa54d8df01e586933f0bcb5ea5f6c7fa2e608
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Incorrect password",
		})
	}
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    strconv.Itoa(int(admin.ID)),
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(), //1 hari
	})
	token, err := claims.SignedString([]byte(SecretKeyAdmin))
	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "Could not login",
		})
	}
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "Login Success",
		"jwt":     token,
	})
<<<<<<< HEAD
=======

>>>>>>> dadfa54d8df01e586933f0bcb5ea5f6c7fa2e608
}

func Admin(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(SecretKeyAdmin), nil
	})
	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "Unauthenticated",
		})
	}
	claims := token.Claims.(*jwt.StandardClaims)
	var admin models.Admin
	database.DB.Where("id = ?", claims.Issuer).First(&admin)

	return c.JSON(admin)
}
func LogoutAdmin(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"message": "Success",
	})
}
