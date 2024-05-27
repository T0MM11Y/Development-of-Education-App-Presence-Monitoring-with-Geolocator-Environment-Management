package models

type Kelas struct {
	ID        uint     `json:"id" gorm:"primarykey"`
	NamaKelas string   `json:"nama_kelas" gorm:"type:varchar(100);not null"`
	Users     []User   `json:"users" gorm:"foreignKey:KelasID"`
	Rosters   []Roster `json:"rosters" gorm:"foreignKey:KelasID"`
	
}
