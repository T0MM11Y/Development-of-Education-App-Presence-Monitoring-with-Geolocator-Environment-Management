package models

type Admin struct {
	ID         uint         `json:"id" gorm:"primarykey"`
	Username   string       `json:"username"`
	Password   []byte       `json:"-"` // - artinya tidak akan di tampilkan
	TanyaJawab []TanyaJawab `json:"tanya_jawab" gorm:"foreignKey:AdminID"`
}
