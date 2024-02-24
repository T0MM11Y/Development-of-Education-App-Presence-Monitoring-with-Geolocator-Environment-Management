package routes

import (
	"API/controllers"

	"github.com/gofiber/fiber/v2"
)

// UserRoutes ...
func Setup(app *fiber.App) {
	app.Post("/api/register", controllers.Register)
	app.Post("/api/login", controllers.Login)
	app.Get("/api/user", controllers.User)
	app.Post("/api/logout", controllers.Logout)
}

// AdminRoutes ...
func SetupAdmin(app *fiber.App) {
	app.Post("/api/registerAdmin", controllers.RegisterAdmin)
	app.Post("/api/loginAdmin", controllers.LoginAdmin)
	app.Get("/api/admin", controllers.Admin)
	app.Post("/api/logoutAdmin", controllers.LogoutAdmin)
}
