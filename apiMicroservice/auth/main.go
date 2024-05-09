package auth

import (
	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()
	SetupRoutes(app)
	app.Listen(":3000")
}
