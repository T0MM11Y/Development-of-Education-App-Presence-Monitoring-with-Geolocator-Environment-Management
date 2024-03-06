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

<<<<<<< HEAD
	app.Static("/api/siswa/uploads", "./uploads")
=======
>>>>>>> dadfa54d8df01e586933f0bcb5ea5f6c7fa2e608
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))

	// Setup user routes
	routes.Setup(app)

	// Setup admin routes
	routes.SetupAdmin(app)

<<<<<<< HEAD
	// Setup siswa routes
	routes.SetupSiswa(app)

=======
>>>>>>> dadfa54d8df01e586933f0bcb5ea5f6c7fa2e608
	app.Listen(":5000")
}
