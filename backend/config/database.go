package config

import (
	"backend/model"
	"fmt"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"os"
)

var DB *gorm.DB

var err error

func InitializeDatabase() {

	err := godotenv.Load()

	if err != nil {
		fmt.Println(err.Error())
		panic("Could not load Env file")
	}

	dns := os.Getenv("dns")

	DB, err = gorm.Open(mysql.Open(dns), &gorm.Config{})
	if err != nil {
		fmt.Println(err.Error())
		panic("Could not connect to Database")
	} else {
		fmt.Println("Connected successfully to the database")
	}
	DB.AutoMigrate(&model.User{}, &model.Post{})
}
