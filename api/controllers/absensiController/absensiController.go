package absensiController

import (
	"fmt"
	"math"
	"strconv"
	"time"

	"API/database"
	"API/models"

	"github.com/gofiber/fiber/v2"
)

// Fungsi untuk menghitung jarak antara dua titik
func haversine(lat1, lon1, lat2, lon2 float64) float64 {
	const r = 6371 // Radius bumi dalam kilometer
	latRad1, latRad2, lonRad1, lonRad2 := toRadians(lat1), toRadians(lat2), toRadians(lon1), toRadians(lon2)
	deltaLat, deltaLon := latRad2-latRad1, lonRad2-lonRad1

	a := math.Pow(math.Sin(deltaLat/2), 2) + math.Cos(latRad1)*math.Cos(latRad2)*math.Pow(math.Sin(deltaLon/2), 2)
	c := 2 * math.Atan2(math.Sqrt(a), math.Sqrt(1-a))

	return r * c
}

// Fungsi untuk mengubah derajat ke radian
func toRadians(deg float64) float64 {
	return deg * math.Pi / 180
}

func GetAllAbsensi(c *fiber.Ctx) error {
	var absensis []models.Absensi
	database.DB.Preload("User").Find(&absensis)
	return c.JSON(fiber.Map{"status": "success", "message": "All absensis retrieved", "data": absensis})
}
func GetAbsensiByUser(c *fiber.Ctx) error {
	userID, _ := strconv.Atoi(c.Params("id"))
	var absensi models.Absensi
	database.DB.Where("user_id = ? AND DATE(tanggal) = ?", userID, time.Now().Format("2006-01-02")).First(&absensi)
	if absensi.ID == 0 {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No absensi found for user today", "data": nil})
	}
	return c.JSON(fiber.Map{"status": "success", "message": "Absensi retrieved", "data": absensi})
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

	// Check if an attendance record already exists for the current day for the user
	var existingAbsensi models.Absensi
	database.DB.Where("user_id = ? AND DATE(tanggal) = ?", absensi.UserID, time.Now().Format("2006-01-02")).First(&existingAbsensi)
	if existingAbsensi.ID != 0 {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Absensi sudah dilakukan hari ini"})
	}
	// Koordinat tempat yang ditentukan
	lat, lon := 3.540176, 98.6576913 // Ganti dengan koordinat yang sesuai

	// Hitung jarak antara tempat pengguna melakukan absen dan tempat yang ditentukan
	jarak := haversine(lat, lon, absensi.Latitude, absensi.Longitude)

	// Print the calculated distance and the GPS coordinates
	fmt.Printf("Jarak: %f, Latitude: %f, Longitude: %f\n", jarak, absensi.Latitude, absensi.Longitude)
	// Jika jarak lebih dari 10 meter, kembalikan error
	if jarak > 0.1 { // 0.01 kilometer = 10 meter
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Anda tidak berada dalam jarak yang ditentukan"})
	}
	if time.Now().Hour() <= 8 {
		absensi.Status = "Hadir"
	} else {
		absensi.Status = "Terlambat"
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
