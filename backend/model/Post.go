package model

import "gorm.io/gorm"

type Post struct {
	gorm.Model
	Title  string `json:"title"`
	Desc   string `json:"desc"`
	Image  string `json:"image"`
	UserID string `json:"userID"`
	User   User   `gorm:"foreignKey:UserID"`
}

//function to set the image
func (post *Post) StringImage(imageUrl string) {
	post.Image = imageUrl
}

func (post *Post) SetId(Id string) {
	post.UserID = Id
}
