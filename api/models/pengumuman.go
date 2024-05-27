package models

type Pengumuman struct {
	ID         uint   `json:"id" gorm:"primarykey"`
	AdminID    uint   `json:"-"`
	UserID     uint   `json:"-"` // Added this line
	Judul      string `json:"judul" gorm:"type:varchar(100);not null"`
	Urlphoto   string `json:"urlphoto"`
	Isi        string `json:"isi"`
	Created_At string `gorm:"column:created_at"`
	Updated_At string `gorm:"column:updated_at"`
}
