package controllers

import (
	"backend/config"
	"backend/model"
	"backend/utils"
	"context"
	"fmt"
	"github.com/cloudinary/cloudinary-go"
	"github.com/cloudinary/cloudinary-go/api/uploader"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
	"log"
	"os"
	"strconv"
)

// create Post
func CreatePost(c *fiber.Ctx) error {
	var post model.Post

	err := c.BodyParser(&post)

	if err != nil {
		fmt.Println("could not load data", err)
	}

	file, err := c.FormFile("image")

	if err != nil {
		log.Fatal(err)
	}

	// Get Buffer from file
	buffer, err := file.Open()

	if err != nil {
		log.Fatal(err)
	}
	defer buffer.Close()

	cld, _ := cloudinary.NewFromParams(os.Getenv("CLOUDINARY_CLOUD_NAME"), os.Getenv("CLOUDINARY_API_KEY"), os.Getenv("CLOUDINARY_API_SECRET"))

	ctx := context.Background()

	resp, err := cld.Upload.Upload(ctx, buffer, uploader.UploadParams{PublicID: "logo"})

	if err != nil {
		log.Fatal(err)
	}

	if file.Size > 1048576 {
		c.Status(fiber.StatusForbidden)
		return c.JSON(fiber.Map{
			"msg": "Upload image less than 10mb",
		})
	}

	cookie := c.Cookies("jwt")
	id, _ := utils.ParseJwt(cookie)
	imageUrl := resp.SecureURL

	post.StringImage(imageUrl)
	post.SetId(id)

	if err := config.DB.Create(&post).Error; err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "invalid payload",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Post created successfully",
		"post":    post,
	})
}

//Get All Posts

func GetAllPosts(c *fiber.Ctx) error {
	var post []model.Post

	err := c.BodyParser(&post)

	if err != nil {
		fmt.Println("could not parse response data")
	}

	if err := config.DB.Find(&post).Error; err != nil {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "could not find post",
		})
	}
	c.Status(fiber.StatusOK)

	return c.JSON(fiber.Map{
		"message": "Posts fetched",
		"post":    post,
	})
}

//Delete Post

func DeletePost(c *fiber.Ctx) error {
	var post model.Post
	params, _ := strconv.Atoi(c.Params("id"))
	err := c.BodyParser(&post)

	if err != nil {
		fmt.Println("could not parse data")
	}

	if err := config.DB.Preload("user").Delete(&post, params).Error; err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "could not delete Post",
		})
	}
	c.Status(fiber.StatusOK)
	return c.JSON(fiber.Map{
		"message": "Post Deleted Successfully",
		"post":    post,
	})
}

//Get Post  single

func GetPost(c *fiber.Ctx) error {
	params, _ := strconv.Atoi(c.Params("id"))

	var post model.Post

	if err := config.DB.Where("id= ?", params).Preload("User").First(&post).Error; err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "post not found on database",
		})
	}

	c.Status(fiber.StatusOK)

	return c.JSON(fiber.Map{
		"message": "Post successfully fetched",
		"post":    post,
	})

}

func UpdatePost(c *fiber.Ctx) error {
	params, _ := strconv.Atoi(c.Params("id"))

	post := model.Post{
		Model: gorm.Model{
			ID: uint(params),
		},
	}

	err := c.BodyParser(&post)

	if err != nil {
		fmt.Println("Unable to Parse Body")
	}

	config.DB.Model(&post).Updates(post)

	c.Status(fiber.StatusOK)

	return c.JSON(fiber.Map{
		"message": "Post Updated",
		"post":    post,
	})
}

func UserPost(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")

	id, _ := utils.ParseJwt(cookie)

	var post []model.Post

	config.DB.Model(&post).Where("user_id= ?", id).Preload("User").Find(&post)

	c.Status(fiber.StatusOK)
	return c.JSON(fiber.Map{
		"post": post,
	})

}

func GetDisplayPosts(c *fiber.Ctx) error {
	var post []model.Post

	err := c.BodyParser(&post)

	if err != nil {
		fmt.Println("could not parse response data")
	}

	if err := config.DB.Find(&post).Error; err != nil {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "could not find post",
		})
	}
	c.Status(fiber.StatusOK)

	return c.JSON(fiber.Map{
		"message": "Posts fetched",
		"post":    post,
	})
}
