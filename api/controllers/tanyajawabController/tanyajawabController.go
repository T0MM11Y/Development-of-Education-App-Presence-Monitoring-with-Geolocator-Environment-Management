package tanyajawabController

import (
	"API/database"
	"API/models"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
)

func AskQuestion(c *fiber.Ctx) error {
	db := database.DB
	tanyaJawab := new(models.TanyaJawab)
	if err := c.BodyParser(tanyaJawab); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Cannot parse JSON",
			"error":   err,
		})
	}

	tanyaJawab.TanggalTanya = time.Now() // Set TanggalTanya to current time

	db.Create(tanyaJawab)

	if db.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error when saving to database",
			"error":   db.Error,
		})
	}

	return c.JSON(fiber.Map{
		"message":       "Question asked successfully",
		"tanyaJawab_id": tanyaJawab.ID,
	})
}

func AnswerQuestion(c *fiber.Ctx) error {
	db := database.DB
	var tanyaJawab models.TanyaJawab
	id := c.Params("id")

	db.Find(&tanyaJawab, id)
	if tanyaJawab.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "No question found with given ID",
		})
	}

	tanyaJawab.Jawaban = c.FormValue("Jawaban")
	tanyaJawab.TanggalJawab = time.Now() // Set TanggalJawab to current time

	adminID, _ := strconv.ParseUint(c.FormValue("AdminID"), 10, 32)
	tanyaJawab.AdminID = uint(adminID)

	result := db.Save(&tanyaJawab)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error when saving to database",
			"error":   result.Error,
		})
	}

	return c.JSON(tanyaJawab)
}
