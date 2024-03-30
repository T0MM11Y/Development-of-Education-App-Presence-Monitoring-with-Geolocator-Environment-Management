package absensiController

import (
	"strconv"
	"time"

	"API/database"
	"API/models"

	"github.com/gofiber/fiber/v2"
)

func GetAllAbsensi(c *fiber.Ctx) error {
	var absensis []models.Absensi
	database.DB.Find(&absensis)
	database.DB.Preload("User").Find(&absensis)
	return c.JSON(fiber.Map{"status": "success", "message": "All absensis retrieved", "data": absensis})
}

func GetAbsensi(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	absensi := models.Absensi{}
	database.DB.Preload("User").Find(&absensi, id)
	if absensi.ID == 0 {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No absensi found with ID", "data": nil})
	}
	return c.JSON(fiber.Map{"status": "success", "message": "Absensi retrieved", "data": absensi})
}

func NewAbsensi(c *fiber.Ctx) error {
	absensi := new(models.Absensi)
	if err := c.BodyParser(absensi); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Couldn't parse JSON", "data": err})
	}
	absensi.Tanggal = time.Now().Format(time.RFC3339) // Convert time.Now() to string
	database.DB.Create(&absensi)
	return c.JSON(fiber.Map{"status": "success", "message": "Absensi created", "data": absensi})
}

func DeleteAbsensi(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	absensi := models.Absensi{}
	database.DB.First(&absensi, id)
	if absensi.ID == 0 {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No absensi found with ID", "data": nil})
	}
	database.DB.Delete(&absensi)
	return c.JSON(fiber.Map{"status": "success", "message": "Absensi successfully deleted", "data": nil})
}
func UpdateAbsensi(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	absensi := models.Absensi{}
	database.DB.First(&absensi, id)
	if absensi.ID == 0 {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No absensi found with ID", "data": nil})
	}
	if err := c.BodyParser(&absensi); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Couldn't parse JSON", "data": err})
	}
	database.DB.Save(&absensi)
	return c.JSON(fiber.Map{"status": "success", "message": "Absensi successfully updated", "data": absensi})
}
