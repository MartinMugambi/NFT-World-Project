package main

import (
	"backend/config"
	"backend/routes"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"os"
)

func main() {

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))
	//set up cross origin in fiber

	//Load the Port env file
	err := godotenv.Load()
	if err != nil {
		fmt.Println(err.Error())
		panic("could not load the port")
	} else {
		fmt.Println("server running")
	}

	port := os.Getenv("PORT")

	//initialize  the database process
	config.InitializeDatabase()

	routes.Routes(app)

	//Listen to the port
	app.Listen(":" + port)

}
