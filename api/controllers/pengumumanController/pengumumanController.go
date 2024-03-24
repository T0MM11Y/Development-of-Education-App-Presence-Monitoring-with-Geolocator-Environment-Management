package pengumumanController

import (
	"API/database"
	"API/models"
	"fmt"
	"path/filepath"
	"time"

	"github.com/gofiber/fiber/v2"
)

func GetAllPengumuman(c *fiber.Ctx) error {
	db := database.DB
	var pengumumans []models.Pengumuman
	db.Find(&pengumumans)
	if len(pengumumans) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "No announcements found",
		})
	}
	return c.JSON(fiber.Map{
		"message": "Successfully fetched all announcements",
		"data":    pengumumans,
	})
}

func GetPengumumanById(c *fiber.Ctx) error {
	db := database.DB
	var pengumuman models.Pengumuman
	id := c.Params("id")

	db.Find(&pengumuman, id)
	if pengumuman.Judul == "" {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "No announcement found with given ID",
		})
	}
	return c.JSON(fiber.Map{
		"message": "Successfully fetched announcement",
		"data":    pengumuman,
	})
}
func CreatePengumuman(c *fiber.Ctx) error {
	db := database.DB
	pengumuman := new(models.Pengumuman)

	// Initialize the URL to an empty string
	url := ""

	// Parse the body into the pengumuman object
	if err := c.BodyParser(pengumuman); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Cannot parse JSON",
		})
	}

	// Get the content from the form data
	content := c.FormValue("content")
	pengumuman.Isi = content // Set the content

	// Get the file from the form data
	file, err := c.FormFile("file")

	// If a file was uploaded, save it and create the URL
	if err == nil {
		// Save the file to a directory
		dir := "./uploads/pengumuman"
		dst := filepath.Join(dir, file.Filename)
		if err := c.SaveFile(file, dst); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error":   true,
				"message": "Could not save file",
			})
		}

		// Create the URL for the file
		url = fmt.Sprintf("http://%s/api/pengumuman/uploads/pengumuman/%s", c.Hostname(), file.Filename)
	}

	// Format the current time to a string
	now := time.Now().Format(time.RFC3339)

	pengumuman.Created_At = now
	pengumuman.Updated_At = now
	pengumuman.Urlphoto = url // Use the file URL here

	db.Create(&pengumuman)
	return c.JSON(fiber.Map{
		"message": "Successfully created announcement",
		"data":    pengumuman,
	})
}
func UpdatePengumuman(c *fiber.Ctx) error {
	db := database.DB
	id := c.Params("id")

	var pengumuman models.Pengumuman
	db.First(&pengumuman, id)

	if pengumuman.Judul == "" {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "No announcement found with given ID",
		})
	}

	if err := c.BodyParser(&pengumuman); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Cannot parse JSON",
		})
	}

	// Get the file from the form data
	file, err := c.FormFile("file")

	// If a file was uploaded, save it and create the URL
	if err == nil {
		// Save the file to a directory
		dir := "./uploads/pengumuman"
		dst := filepath.Join(dir, file.Filename)
		if err := c.SaveFile(file, dst); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error":   true,
				"message": "Could not save file",
			})
		}

		// Create the URL for the file
		url := fmt.Sprintf("http://%s/api/pengumuman/uploads/pengumuman/%s", c.Hostname(), file.Filename)
		pengumuman.Urlphoto = url // Use the file URL here
	}

	// Format the current time to a string
	now := time.Now().Format(time.RFC3339)

	pengumuman.Updated_At = now

	db.Save(&pengumuman)
	return c.JSON(fiber.Map{
		"message": "Successfully updated announcement",
		"data":    pengumuman,
	})
}
func DeletePengumuman(c *fiber.Ctx) error {
	db := database.DB
	id := c.Params("id")

	var pengumuman models.Pengumuman
	db.First(&pengumuman, id)

	if pengumuman.Judul == "" {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "No announcement found with given ID",
		})
	}

	db.Delete(&pengumuman)
	return c.JSON(fiber.Map{
		"message": "Successfully deleted announcement",
	})
}
