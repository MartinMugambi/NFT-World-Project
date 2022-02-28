package controllers

import (
	"backend/config"
	"backend/model"
	"backend/utils"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"regexp"
	"strings"
)

//validate email address
func validateEmail(email string) bool {
	re := regexp.MustCompile(`^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$`)
	return re.MatchString(email)
}

func CreateUser(c *fiber.Ctx) error {

	var data map[string]interface{}

	var userData model.User

	if err := c.BodyParser(&data); err != nil {
		fmt.Println("Could not parse data")
	}

	if len(data["password"].(string)) <= 6 {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "password must be more than 6 characters",
		})
	}
	if !validateEmail(data["email"].(string)) {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "invalid email address",
		})
	}

	config.DB.Where("email = ?", strings.TrimSpace(data["email"].(string))).First(&userData)

	if userData.ID != 0 {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "email already exists in database",
		})
	}

	user := model.User{
		Name:     data["name"].(string),
		Username: data["username"].(string),
		Email:    data["email"].(string),
	}

	user.HashPassword(data["password"].(string))

	config.DB.Create(&user)

	c.Status(200)

	return c.JSON(fiber.Map{
		"user":    user,
		"message": "Account created Successfully",
	})
}

func GetUser(c *fiber.Ctx) error {

	var user model.User

	cookie := c.Cookies("jwt")

	id, _ := utils.ParseJwt(cookie)

	if err := config.DB.Where("ID = ?", id).First(&user); err != nil {
		c.Status(fiber.StatusUnauthorized)
		c.JSON(fiber.Map{
			"message": "user is unauthorized",
		})
	}

	c.Status(fiber.StatusOK)
	return c.JSON(fiber.Map{
		"message": "user found",
		"user":    user,
	})
}
