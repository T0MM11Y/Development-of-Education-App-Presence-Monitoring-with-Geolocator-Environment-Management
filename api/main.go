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

	app.Static("/api/siswa/uploads", "./uploads")
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	// Setup user routes
	routes.Setup(app)

	// Setup admin routes
	routes.SetupAdmin(app)

	// Setup siswa routes
	routes.SetupSiswa(app)

	app.Listen(":5000")
}
