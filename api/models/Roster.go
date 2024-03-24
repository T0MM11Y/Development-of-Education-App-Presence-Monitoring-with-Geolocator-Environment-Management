package models

type Roster struct {
	ID        uint    `json:"id" gorm:"primarykey"`
	Nama      string  `json:"nama" gorm:"type:varchar(100);not null"`
	Deskripsi string  `json:"deskripsi" gorm:"type:varchar(255);not null"`
	Guru      string  `json:"guru" gorm:"type:varchar(100);not null"`
	Jadwal    string  `json:"jadwal" gorm:"type:varchar(100);not null"`
	Kelas     []Kelas `json:"kelas" gorm:"many2many:kelas_rosters;"`
}

type KelasRoster struct {
	KelasID  uint
	RosterID uint
}
