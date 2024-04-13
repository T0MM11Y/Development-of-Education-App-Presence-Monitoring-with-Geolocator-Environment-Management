package main

import (
	"API/controllers/absensiController"
	"API/database"
	"API/routes"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/robfig/cron/v3"
)

func main() {
	database.Connect()

	app := fiber.New()

	app.Static("/api/siswa/uploads/siswa", "./uploads/siswa")
	app.Static("/api/pengumuman/uploads/pengumuman", "./uploads/pengumuman")
	app.Static("/api/pengajar/uploads/pengajar", "./uploads/pengajar")
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	// Setup user routes
	routes.Setup(app)

	// Setup admin routes
	routes.SetupAdmin(app)

	// Setup pengumuman routes
	routes.SetupPengumuman(app)

	// Setup kelas routes
	routes.SetupKelas(app)

	// Setup siswa routes
	routes.SetupSiswa(app)

	// Setup roster routes
	routes.SetupRoster(app)

	// Setup pengajar routes
	routes.SetupPengajar(app)

	// Setup tanya jawab routes
	routes.SetupTanyaJawab(app)

	// Setup absensi routes
	routes.SetupAbsensi(app)

	c := cron.New()
	_, err := c.AddFunc("59 23 * * *", func() {
		absensiController.RecordAutomaticAbsensi()
	})
	if err != nil {
		log.Fatal(err)
	}
	c.Start()

	app.Listen(":5000")
}
