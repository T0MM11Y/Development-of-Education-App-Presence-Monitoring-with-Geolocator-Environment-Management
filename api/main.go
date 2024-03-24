package main

import (
	"API/database"
	"API/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	database.Connect()

	app := fiber.New()

	app.Static("/api/siswa/uploads/siswa", "./uploads/siswa")
	app.Static("/api/pengumuman/uploads/pengumuman", "./uploads/pengumuman") // Add this line
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

	app.Listen(":5000")
}
