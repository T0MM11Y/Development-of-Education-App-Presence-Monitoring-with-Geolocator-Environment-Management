package models

type Absensi struct {
	ID        uint    `gorm:"primarykey"`
	UserID    uint    `json:"user_id"`
	User      User    `json:"user" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Tanggal   string  `json:"tanggal"` // Ubah ini menjadi string
	Lokasi    string  `json:"lokasi"`
	Latitude  float64 `json:"latitude"`
	Longitude float64 `json:"longitude"`
	Status    string  `json:"status"` // Hadir, Izin, Sakit, dll.
}
