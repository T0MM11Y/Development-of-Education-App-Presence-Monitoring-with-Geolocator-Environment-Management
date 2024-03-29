package models

import (
	"time"
)

type TanyaJawab struct {
	ID           uint      `gorm:"primarykey"`
	Pertanyaan   string    `json:"pertanyaan"`
	Jawaban      string    `json:"jawaban"`
	TanggalTanya time.Time `json:"tanggal_tanya"`
	TanggalJawab time.Time `json:"tanggal_jawab"`
	UserID       uint      `json:"user_id"`
	User         User      `gorm:"foreignKey:UserID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	AdminID      uint      `json:"admin_id"`
	Admin        Admin     `gorm:"foreignKey:AdminID"`
}
