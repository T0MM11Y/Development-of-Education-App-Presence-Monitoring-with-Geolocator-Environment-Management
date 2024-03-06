package models

type User struct {
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
}
