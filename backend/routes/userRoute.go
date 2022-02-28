package routes

import (
	"backend/controllers"
	"backend/middleware"
	"github.com/gofiber/fiber/v2"
)

func Routes(app *fiber.App) {
	app.Post("/api/register", controllers.CreateUser)
	app.Post("/api/login", controllers.LoginUser)
	app.Get("/api/display", controllers.GetDisplayPosts)
	app.Use(middleware.IsAuthenticated)
	app.Post("/api/posts", controllers.CreatePost)
	app.Get("/api/user", controllers.GetUser)
	app.Get("/api/posts", controllers.GetAllPosts)
	app.Get("/api/posts/:id", controllers.GetPost)
	app.Get("/api/userpost", controllers.UserPost)
	app.Put("/api/posts/:id", controllers.UpdatePost)
	app.Delete("/api/posts/:id", controllers.DeletePost)
	app.Post("/api/logout", controllers.Logout)

}
