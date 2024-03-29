package models

type Roster struct {
	ID            uint     `json:"id" gorm:"primaryKey"`
	MataPelajaran string   `json:"mata_pelajaran" gorm:"not null"`
	WaktuMulai    string   `json:"waktu_mulai" gorm:"not null"`
	WaktuSelesai  string   `json:"waktu_selesai" gorm:"not null"`
	KelasID       uint     `json:"kelas_id"`
	Hari          string   `json:"hari" gorm:"not null"`
	PengajarID    uint     `json:"pengajar_id"`
	Pengajar      Pengajar `json:"Pengajar" gorm:"foreignKey:PengajarID"`
}
