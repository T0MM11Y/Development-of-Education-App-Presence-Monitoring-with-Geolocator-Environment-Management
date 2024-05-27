package rosterController

import (
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"

	"API/database"
	"API/models"
)

func GetAllRosters(c *fiber.Ctx) error {
	db := database.DB
	var rosters []models.Roster

	db.Preload("Pengajar").Find(&rosters)

	if len(rosters) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "No rosters found",
		})
	}
	return c.JSON(rosters)
}

func GetRosterById(c *fiber.Ctx) error {
	db := database.DB
	var roster models.Roster

	rosterID, _ := strconv.Atoi(c.Params("id"))    // Get roster ID from route parameters
	db.Preload("Pengajar").Find(&roster, rosterID) // Find roster by ID

	if roster.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "No roster found with given ID",
		})
	}

	return c.JSON(roster)

}
func CreateRoster(c *fiber.Ctx) error {
	db := database.DB
	roster := new(models.Roster)

	if err := c.BodyParser(roster); err != nil {
		fmt.Println("Error parsing JSON:", err) // Tambahkan log ini
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Cannot parse JSON",
		})
	}

	fmt.Println("Data yang diterima:", roster) // Tambahkan log ini

	// Check if the Kelas record exists
	var kelas models.Kelas
	if err := db.First(&kelas, roster.KelasID).Error; err != nil {
		fmt.Println("Error finding Kelas:", err) // Tambahkan log ini
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Kelas not found",
		})
	}

	// Check if the Pengajar record exists
	var pengajar models.Pengajar
	if err := db.First(&pengajar, roster.PengajarID).Error; err != nil {
		fmt.Println("Error finding Pengajar:", err) // Tambahkan log ini
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Pengajar not found",
		})
	}

	result := db.Create(&roster)
	if result.Error != nil {
		fmt.Println("Error creating Roster:", result.Error) // Tambahkan log ini
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to create roster",
		})
	}

	return c.JSON(
		fiber.Map{
			"message": "Roster created successfully",

			"roster": roster,
		},
	)
}

func GetRostersByKelasId(c *fiber.Ctx) error {
	db := database.DB
	var kelas models.Kelas
	id := c.Params("id")

	db.Preload("Rosters").Find(&kelas, id)
	db.Preload("Rosters.Pengajar").Find(&kelas, id)
	if kelas.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "No class found with given ID",
		})
	}
	return c.JSON(kelas.Rosters)
}
func UpdateRoster(c *fiber.Ctx) error {
	db := database.DB
	var roster models.Roster
	id := c.Params("id")

	db.Find(&roster, id)
	if roster.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "No roster found with given ID",
		})
	}

	if err := c.BodyParser(&roster); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Cannot parse JSON",
		})
	}

	db.Save(&roster)
	return c.JSON(
		fiber.Map{
			"message": "Roster updated successfully",
			"roster":  roster,
		},
	)
}

func DeleteRoster(c *fiber.Ctx) error {
	db := database.DB
	var roster models.Roster
	id := c.Params("id")

	db.Find(&roster, id)
	if roster.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "No roster found with given ID",
		})
	}

	db.Delete(&roster)
	return c.JSON(fiber.Map{
		"message": "Roster deleted successfully",
	})
}
