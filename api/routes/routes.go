package routes

import (
	"API/controllers"
	"API/controllers/pengumumanController"
	"API/controllers/siswaController"

	"API/controllers/kelasController"

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
func SetupPengumuman(app *fiber.App) {
	app.Get("/api/pengumuman", pengumumanController.GetAllPengumuman)
	app.Post("/api/pengumuman", pengumumanController.CreatePengumuman)
	app.Get("/api/pengumuman/:id", pengumumanController.GetPengumumanById)
	app.Put("/api/pengumuman/:id", pengumumanController.UpdatePengumuman)
	app.Delete("/api/pengumuman/:id", pengumumanController.DeletePengumuman)
}
func SetupKelas(app *fiber.App) {
	app.Get("/api/kelas", kelasController.GetAllKelas)
	app.Post("/api/kelas", kelasController.CreateKelas)
	app.Get("/api/kelas/:id", kelasController.GetKelasById)
	app.Put("/api/kelas/:id", kelasController.UpdateKelas)
	app.Delete("/api/kelas/:id", kelasController.DeleteKelas)
}
