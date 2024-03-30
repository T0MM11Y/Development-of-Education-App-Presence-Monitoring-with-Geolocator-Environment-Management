package routes

import (
	"API/controllers"
	"API/controllers/kelasController"
	"API/controllers/pengajarController"
	"API/controllers/pengumumanController"
	"API/controllers/rosterController"
	"API/controllers/siswaController"
	"API/controllers/tanyajawabController"

	"API/controllers/absensiController"

	"github.com/gofiber/fiber/v2"
)

func SetupRoster(app *fiber.App) {
	app.Get("/api/roster", rosterController.GetAllRosters)
	app.Post("/api/roster", rosterController.CreateRoster)
	app.Get("/api/roster/:id", rosterController.GetRosterById)
	app.Put("/api/roster/:id", rosterController.UpdateRoster)
	app.Delete("/api/roster/:id", rosterController.DeleteRoster)
}

// UserRoutes ...
func Setup(app *fiber.App) {
	app.Post("/api/login", controllers.Login)
	app.Get("/api/user", controllers.User)
	app.Post("/api/logout", controllers.Logout)
}
func SetupKelas(app *fiber.App) {
	app.Get("/api/kelas", kelasController.GetAllKelas)
	app.Post("/api/kelas", kelasController.CreateKelas)
	app.Get("/api/kelas/:id", kelasController.GetKelasById)
	app.Put("/api/kelas/:id", kelasController.UpdateKelas)
	app.Delete("/api/kelas/:id", kelasController.DeleteKelas)
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
func SetupPengajar(app *fiber.App) {
	app.Get("/api/pengajar", pengajarController.GetAllPengajar)
	app.Post("/api/pengajar", pengajarController.CreatePengajar)
	app.Get("/api/pengajar/:id", pengajarController.GetPengajarById)
	app.Put("/api/pengajar/:id", pengajarController.UpdatePengajar)
	app.Delete("/api/pengajar/:id", pengajarController.DeletePengajar)
}

// Setup tANYAJAWAB routes
func SetupTanyaJawab(app *fiber.App) {
	app.Get("/api/tanyajawab", tanyajawabController.GetAllQuestions)
	app.Get("/api/tanyajawab/:id", tanyajawabController.GetQuestionById)
	app.Delete("/api/tanyajawab/:id", tanyajawabController.DeleteQuestion)
	app.Post("/api/tanyajawab", tanyajawabController.AskQuestion)
	app.Put("/api/tanyajawab/:id", tanyajawabController.AnswerQuestion)
}

func SetupAbsensi(app *fiber.App) {
	app.Get("/api/absensi", absensiController.GetAllAbsensi)
	app.Post("/api/absensi", absensiController.NewAbsensi)
	app.Get("/api/absensi/:id", absensiController.GetAbsensi)
	app.Put("/api/absensi/:id", absensiController.UpdateAbsensi)
	app.Delete("/api/absensi/:id", absensiController.DeleteAbsensi)
}
