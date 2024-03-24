package models

type Kelas struct {
	ID        uint     `json:"id" gorm:"primarykey"`
	NamaKelas string   `json:"nama_kelas" gorm:"type:varchar(100);not null"`
	Users     []User   `json:"users" gorm:"foreignKey:KelasID"`
	Roster    []Roster `json:"roster" gorm:"many2many:kelas_rosters;"`
}
