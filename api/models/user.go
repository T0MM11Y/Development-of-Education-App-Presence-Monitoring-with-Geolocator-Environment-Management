package models

type User struct {
<<<<<<< HEAD
	ID            uint   `gorm:"primarykey"`
	NISN          int    `json:"NISN" gorm:"unique"`
	Nama_Depan    string `json:"Nama_Depan"`
	Nama_Belakang string `json:"Nama_Belakang"`
	Kelas         string `json:"Kelas"`
	Agama         string `json:"Agama"`
	Email         string `json:"Email" gorm:"unique"`
	Alamat        string `json:"Alamat"`
	Tanggal_Lahir string `json:"Tanggal_Lahir"`
	Jenis_Kelamin string `json:"Jenis_Kelamin"`
	Urlphoto      string `json:"Urlphoto"`
	Password      []byte `json:"-"`
=======
	NISN      uint   `json:"nisn"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email" gorm:"unique"`
	Class     string `json:"class"`
	Age       string `json:"age"`
	Gender    string `json:"gender"`
	Password  []byte `json:"-"` // - artinya tidak akan di tampilkan
>>>>>>> dadfa54d8df01e586933f0bcb5ea5f6c7fa2e608
}
