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
	db.Preload("Kelas").Find(&siswa, id)

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
	db.Preload("Kelas").Find(&siswas)

	db.Preload("Kelas.Rosters").Find(&siswas)

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

	// Handle file upload
	file, err := c.FormFile("Urlphoto")
	if err == nil {
		dir := "./uploads/siswa/"
		dst := filepath.Join(dir, file.Filename)
		if err := c.SaveFile(file, dst); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error":   true,
				"message": "Could not save file",
			})
		}
		siswa.Urlphoto = fmt.Sprintf("http://%s/api/siswa/uploads/siswa/%s", c.Hostname(), file.Filename)
	}

	// Update the student's data
	siswa.Nama_Depan = c.FormValue("Nama_Depan")
	siswa.Nama_Belakang = c.FormValue("Nama_Belakang")
	kelasID, _ := strconv.ParseUint(c.FormValue("KelasID"), 10, 32)
	siswa.KelasID = uint(kelasID)
	siswa.Agama = c.FormValue("Agama")
	siswa.Email = c.FormValue("Email")
	siswa.Alamat = c.FormValue("Alamat")
	siswa.Tanggal_Lahir = c.FormValue("Tanggal_Lahir")
	siswa.Jenis_Kelamin = c.FormValue("Jenis_Kelamin")

	result := db.Save(&siswa)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Error when saving to database",
			"error":   result.Error,
		})
	}

	return c.JSON(siswa)
}

func DeleteSiswa(c *fiber.Ctx) error {
	db := database.DB
	var siswa models.User
	id := c.Params("id")

	// Delete referencing records in the tanya_jawabs table
	db.Where("user_id = ?", id).Delete(&models.TanyaJawab{})

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
func ChangePassword(c *fiber.Ctx) error {
	db := database.DB
	var siswa models.User
	id := c.Params("id")

	db.Find(&siswa, id)
	if siswa.ID == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"message": "Tidak ada siswa dengan ID yang diberikan",
		})
	}

	// Get the old password, new password, and confirmation from the form data
	oldPassword := c.FormValue("old_password")
	newPassword := c.FormValue("new_password")
	confirmPassword := c.FormValue("confirm_password")

	// Check if any of the fields are empty
	if oldPassword == "" || newPassword == "" || confirmPassword == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Semua field harus diisi",
		})
	}

	// Check if the old password is correct
	err := bcrypt.CompareHashAndPassword(siswa.Password, []byte(oldPassword))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Password lama salah",
		})
	}

	// Check if the new password and confirmation match
	if newPassword != confirmPassword {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Password baru dan konfirmasi password tidak cocok",
		})
	}

	// Hash the new password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newPassword), 14)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Terjadi kesalahan saat melakukan hashing password",
			"error":   err,
		})
	}

	// Update the student's password
	siswa.Password = hashedPassword
	result := db.Save(&siswa)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Terjadi kesalahan saat menyimpan ke database",
			"error":   result.Error,
		})
	}

	return c.JSON(fiber.Map{
		"message": "Password berhasil diubah",
	})
}
func RegisterSiswa(c *fiber.Ctx) error {
	// Initialize the URL to an empty string
	url := ""

	// Get the file from the form data
	file, err := c.FormFile("Urlphoto")

	// If a file was uploaded, save it and create the URL
	if err == nil {
		// Save the file to a directory
		dir := "./uploads/siswa/"
		dst := filepath.Join(dir, file.Filename)
		if err := c.SaveFile(file, dst); err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error":   true,
				"message": "Could not save file",
			})
		}

		// Create the URL for the file
		url = fmt.Sprintf("http://%s/api/siswa/uploads/siswa/%s", c.Hostname(), file.Filename)
	}

	// Dapatkan KelasID dari request
	kelasID, err := strconv.ParseUint(c.FormValue("KelasID"), 10, 32)
	if err != nil {
		// Handle parsing error
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   true,
			"message": "Invalid KelasID format",
		})
	}

	// Cek apakah Kelas dengan KelasID tersebut ada
	var kelas models.Kelas
	result := database.DB.First(&kelas, kelasID)
	if result.Error != nil {
		// Jika tidak ada, kembalikan error
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   true,
			"message": "Kelas with given ID does not exist",
		})
	}

	// Jika ada, lanjutkan dengan membuat User

	password, _ := bcrypt.GenerateFromPassword([]byte("siswa123"), 14)
	nisn, err := strconv.ParseInt(c.FormValue("NISN"), 10, 32)
	fmt.Println("NISN:", c.FormValue("NISN"))
	fmt.Println("Error:", err)
	if err != nil {
		// Handle parsing error
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   true,
			"message": "Invalid NISN format",
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
		KelasID:       uint(kelasID),
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
		"message": "User created successfully",
		"toast":   "Siswa telah berhasil ditambahkan",
		"user_id": user,
	})

}
