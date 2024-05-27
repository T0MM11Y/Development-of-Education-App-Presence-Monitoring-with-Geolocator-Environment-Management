package models

type Pengajar struct {
	ID            uint     `gorm:"primarykey"`
	NIP           int      `gorm:"column:NIP;unique"`
	Nama_Depan    string   `json:"Nama_Depan"`
	Nama_Belakang string   `json:"Nama_Belakang"`
	Bidang        string   `json:"Bidang"`
	Email         string   `json:"Email" gorm:"unique"`
	Alamat        string   `json:"Alamat"`
	Agama         string   `json:"Agama"`
	Tanggal_Lahir string   `json:"Tanggal_Lahir"`
	Jenis_Kelamin string   `json:"Jenis_Kelamin"`
	Urlphoto      string   `json:"Urlphoto"`
	Rosters       []Roster `json:"rosters" gorm:"foreignKey:PengajarID"`
	  
}
