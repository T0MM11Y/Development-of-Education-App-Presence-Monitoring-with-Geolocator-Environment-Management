package models

type User struct {
	NISN      uint   `json:"nisn"`
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email" gorm:"unique"`
	Class     string `json:"class"`
	Age       string `json:"age"`
	Gender    string `json:"gender"`
	Password  []byte `json:"-"` // - artinya tidak akan di tampilkan
}
