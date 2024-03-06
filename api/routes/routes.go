package routes

import (
	"API/controllers"
	"API/controllers/siswaController"

	"github.com/gofiber/fiber/v2"
)

// UserRoutes ...
func Setup(app *fiber.App) {
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

// SiswaRoutes ...
func SetupSiswa(app *fiber.App) {
	app.Get("/api/siswa", siswaController.GetAllSiswa)
	app.Post("/api/register", siswaController.RegisterSiswa)
	app.Get("/api/siswa/:id", siswaController.GetSiswaById)
	app.Put("/api/siswa/:id", siswaController.UpdateSiswa)
	app.Delete("/api/siswa/:id", siswaController.DeleteSiswa)

}
