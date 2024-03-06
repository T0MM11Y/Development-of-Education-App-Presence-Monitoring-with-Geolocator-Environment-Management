package siswaController

import (
	"API/database"
	"API/models"
	"fmt"
	"path/filepath"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

func GetSiswaById(c *fiber.Ctx) error {
	db := database.DB
	var siswa models.User
	id := c.Params("id")

	db.Find(&siswa, id)
	if siswa.NISN == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "No student found with given ID",
		})
	}
	return c.JSON(siswa)
}
func GetAllSiswa(c *fiber.Ctx) error {

	db := database.DB
	var siswas []models.User
	db.Find(&siswas)
	if len(siswas) == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "No students found",
		})
	}
	return c.JSON(siswas)
}
func UpdateSiswa(c *fiber.Ctx) error {
	db := database.DB
	var siswa models.User
	id := c.Params("id")

	db.Find(&siswa, id)
	if siswa.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "No student found with given ID",
		})
	}

	// Get the new NISN and email from the form data
	newNISN, err := strconv.ParseInt(c.FormValue("NISN"), 10, 32)
	newEmail := c.FormValue("Email")
	if err != nil {
		// Handle parsing error
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   true,
			"message": "Invalid NISN format",
		})
	}

	// Check if the new NISN or email is already in use
	var existingUser models.User
	db.Where("NISN = ? OR Email = ?", newNISN, newEmail).First(&existingUser)
	if existingUser.NISN != 0 && existingUser.ID != siswa.ID {
		// Another student with the same NISN or email exists
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   true,
			"message": "NISN or email already in use",
		})
	}

	// Update the student's data
	siswa.Nama_Depan = c.FormValue("Nama_Depan")
	siswa.Nama_Belakang = c.FormValue("Nama_Belakang")
	siswa.Kelas = c.FormValue("Kelas")
	siswa.Agama = c.FormValue("Agama")
	siswa.Email = c.FormValue("Email")
	siswa.Alamat = c.FormValue("Alamat")
	siswa.Tanggal_Lahir = c.FormValue("Tanggal_Lahir")
	siswa.Jenis_Kelamin = c.FormValue("Jenis_Kelamin")

	db.Save(&siswa)

	return c.JSON(siswa)
}
func DeleteSiswa(c *fiber.Ctx) error {
	db := database.DB
	var siswa models.User
	id := c.Params("id")

	db.Find(&siswa, id)
	if siswa.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "No student found with given ID",
		})
	}

	db.Delete(&siswa)

	return c.JSON(fiber.Map{
		"message": "Student deleted successfully",
	})
}
func RegisterSiswa(c *fiber.Ctx) error {
	// Initialize the URL to an empty string
	url := ""

	// Get the file from the form data
	file, err := c.FormFile("file")

	// If a file was uploaded, save it and create the URL
	if err == nil {
		// Save the file to a directory
		dir := "./uploads"
		dst := filepath.Join(dir, file.Filename)
		if err := c.SaveFile(file, dst); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error":   true,
				"message": "Could not save file",
			})
		}

		// Create the URL for the file
		url = fmt.Sprintf("http://%s/api/siswa/uploads/%s", c.Hostname(), file.Filename)
	}

	// Get the other fields from the form data
	password, _ := bcrypt.GenerateFromPassword([]byte("siswa123"), 14)
	nisn, err := strconv.ParseInt(c.FormValue("NISN"), 10, 32)
	fmt.Println("NISN:", c.FormValue("NISN"))
	fmt.Println("Error:", err)
	if err != nil {
		// Handle parsing error
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   true,
			"message": "Invalid NISN formatt",
		})
	}
	var existingUser models.User
	database.DB.Where("NISN = ? OR Email = ?", nisn, c.FormValue("Email")).First(&existingUser)
	if existingUser.NISN != 0 {
		// User dengan NISN atau email yang sama sudah ada
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   true,
			"message": "NISN or email already in use",
		})
	}

	user := models.User{
		NISN:          int(nisn),
		Nama_Depan:    c.FormValue("Nama_Depan"),
		Nama_Belakang: c.FormValue("Nama_Belakang"),
		Kelas:         c.FormValue("Kelas"),
		Agama:         c.FormValue("Agama"),
		Email:         c.FormValue("Email"),
		Alamat:        c.FormValue("Alamat"),
		Tanggal_Lahir: c.FormValue("Tanggal_Lahir"),
		Jenis_Kelamin: c.FormValue("Jenis_Kelamin"),
		Urlphoto:      url, // Use the file URL here
		Password:      password,
	}
	database.DB.Create(&user)

	// Return appropriate response, for example, user ID
	return c.JSON(fiber.Map{
		"message":   "User created successfully",
		"toast":     "Siswa telah berhasil ditambahkan",
		"user_id":   user.NISN,
		"url_photo": url,
	})

}
