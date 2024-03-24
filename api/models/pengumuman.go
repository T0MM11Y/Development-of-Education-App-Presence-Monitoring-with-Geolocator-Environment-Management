package models

type Pengumuman struct {
	ID         uint   `json:"id" gorm:"primarykey"`
	Judul      string `json:"judul" gorm:"type:varchar(100);not null"`
	Urlphoto   string `json:"urlphoto"`
	Isi        string `json:"isi"`
	Created_At string `gorm:"column:created_at"` // change this to match the type in your database
	Updated_At string `gorm:"column:updated_at"` // change this to match the type in your database
}
