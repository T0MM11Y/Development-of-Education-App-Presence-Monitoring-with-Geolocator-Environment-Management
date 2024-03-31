package tanyajawabController

import (
	"API/database"
	"API/models"
	"fmt"
	"time"

	"github.com/gofiber/fiber/v2"
)

func AskQuestion(c *fiber.Ctx) error {
	db := database.DB
	question := new(models.TanyaJawab)
	question.AdminID = nil

	if err := c.BodyParser(question); err != nil {
		fmt.Println(err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Cannot parse JSON",
		})
	}

	// Cek apakah user_id ada di tabel users
	var user models.User
	if err := db.First(&user, question.UserID).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "User not found",
		})
	}

	question.TanggalTanya = time.Now().Format(time.RFC3339)

	result := db.Create(&question)
	if result.Error != nil {
		fmt.Println(result.Error)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to ask question",
		})
	}

	return c.JSON(question)
}
func AnswerQuestion(c *fiber.Ctx) error {
	db := database.DB
	id := c.Params("id")
	var question models.TanyaJawab

	if err := db.First(&question, id).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Question not found",
		})
	}

	if err := c.BodyParser(&question); err != nil {
		fmt.Println(err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Cannot parse JSON",
		})
	}

	question.TanggalJawab = time.Now().Format(time.RFC3339)
	adminID := uint(1)
	question.AdminID = &adminID

	result := db.Save(&question)
	if result.Error != nil {
		fmt.Println(result.Error)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to answer question",
		})
	}

	return c.JSON(question)
}
func GetAllQuestions(c *fiber.Ctx) error {
	db := database.DB
	var questions []models.TanyaJawab

	db.Find(&questions)
	db.Preload("User").Preload("Admin").Find(&questions)

	if len(questions) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "No questions found",
		})
	}

	return c.JSON(questions)
}

func GetQuestionById(c *fiber.Ctx) error {
	db := database.DB
	id := c.Params("id")
	var question models.TanyaJawab

	db.Find(&question, id)
	db.Preload("User").Preload("Admin").Find(&question)

	if question.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "No question found with given ID",
		})
	}

	return c.JSON(question)
}

func DeleteQuestion(c *fiber.Ctx) error {
	db := database.DB
	id := c.Params("id")
	var question models.TanyaJawab

	db.Find(&question, id)

	if question.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "No question found with given ID",
		})
	}

	db.Delete(&question)

	return c.JSON(fiber.Map{
		"message": "Question deleted successfully",
	})
}
