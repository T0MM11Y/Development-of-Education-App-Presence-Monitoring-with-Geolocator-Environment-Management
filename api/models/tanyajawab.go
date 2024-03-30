package models

type TanyaJawab struct {
	ID           uint   `json:"id" gorm:"primarykey"`
	Pertanyaan   string `json:"pertanyaan"`
	Jawaban      string `json:"jawaban"`
	TanggalTanya string `json:"tanggal_tanya"`
	TanggalJawab string `json:"tanggal_jawab"`
	AdminID      *uint  `json:"admin_id"` // pointer( nullable )
	Admin        Admin  `json:"admin" gorm:"foreignKey:AdminID"`
	UserID       uint   `json:"user_id"`
	User         User   `json:"user" gorm:"foreignKey:UserID"`
}
