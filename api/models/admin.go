package models

type Admin struct {
	ID         uint         `json:"id" gorm:"primarykey"`
	Username   string       `json:"username"`
	Password   []byte       `json:"-"` // - means it will not be displayed
	TanyaJawab []TanyaJawab `json:"tanya_jawab" gorm:"foreignKey:AdminID"`
	Pengumuman []Pengumuman `json:"pengumuman" gorm:"foreignKey:AdminID"` // Added this line
}
