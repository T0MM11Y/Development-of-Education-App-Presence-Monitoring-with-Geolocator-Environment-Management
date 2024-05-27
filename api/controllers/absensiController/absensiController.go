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
func GetAbsensiByUserhariini(c *fiber.Ctx) error {
	userID, _ := strconv.Atoi(c.Params("id"))
	var absensis []models.Absensi
	database.DB.Where("user_id = ? AND DATE(tanggal) = ?", userID, time.Now().Format("2006-01-02")).Find(&absensis)
	if len(absensis) == 0 {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "No absensi found for user today", "data": nil})
	}
	return c.JSON(fiber.Map{"status": "success", "message": "Absensi retrieved", "data": absensis})
}
func GetAbsensiHistoryByUser(c *fiber.Ctx) error {
	userID, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Invalid user ID", "data": err})
	}
	var absensis []models.Absensi
	database.DB.Where("user_id = ?", userID).Find(&absensis)
	if len(absensis) == 0 {
		return c.Status(404).JSON(fiber.Map{"status": "error", "message": "Tidak ditemukan history absensi untuk user ini", "data": nil})
	}
	return c.JSON(fiber.Map{"status": "success", "message": "History absensi berhasil diambil", "data": absensis})
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
	// Cek apakah hari ini adalah hari Minggu
	if time.Now().Weekday() == time.Sunday {
		return c.Status(400).JSON(fiber.Map{"status": "error", "message": "Absensi tidak bisa dilakukan pada hari Minggu"})
	}

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
	lat, lon := 2.385738, 99.148592 // Ganti dengan koordinat yang sesuai

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

// RecordAutomaticAbsensi mencatat absensi secara otomatis jika tidak ada absensi yang dilakukan
func RecordAutomaticAbsensi() {
	var users []models.User
	database.DB.Find(&users) // Mengambil semua pengguna

	today := time.Now().Format("2006-01-02")

	// Cek apakah hari ini adalah hari Minggu
	if time.Now().Weekday() == time.Sunday {
		fmt.Println("Hari ini adalah hari Minggu, tidak mencatat absensi.")
		return // Jangan lanjutkan jika hari ini adalah hari Minggu
	}

	// Mendefinisikan daftar hari libur
	var hariLibur = map[string]bool{
		"2023-01-01": true, // Tahun Baru Masehi
		"2023-04-22": true, // Hari Raya Idul Fitri 1444 Hijriyah
		"2023-04-23": true, // Hari Raya Idul Fitri 1444 Hijriyah
		"2023-05-01": true, // Hari Buruh Internasional
		"2023-05-18": true, // Kenaikan Isa Almasih
		"2023-06-01": true, // Hari Lahir Pancasila
		"2023-06-29": true, // Hari Raya Idul Adha 1444 Hijriyah
		"2023-07-19": true, // Tahun Baru Islam 1445 Hijriyah
		"2023-08-17": true, // Hari Kemerdekaan RI
		"2023-09-28": true, // Maulid Nabi Muhammad SAW
		"2023-12-25": true, // Hari Raya Natal
	}

	// Periksa apakah hari ini adalah hari libur
	if _, adalahLibur := hariLibur[today]; adalahLibur {
		fmt.Println("Hari ini adalah hari libur, tidak mencatat absensi.")
		return // Jangan lanjutkan jika hari ini adalah hari libur
	}

	for _, user := range users {
		var absensiCount int64
		database.DB.Model(&models.Absensi{}).Where("user_id = ? AND DATE(tanggal) = ?", user.ID, today).Count(&absensiCount)

		if absensiCount == 0 {
			// Tidak ada absensi untuk pengguna ini hari ini, mencatat sebagai "Tidak Hadir"
			newAbsensi := models.Absensi{
				UserID:  user.ID,
				Tanggal: time.Now().Format(time.RFC3339),
				Status:  "Absen",
			}
			database.DB.Create(&newAbsensi)
		}
	}
}
