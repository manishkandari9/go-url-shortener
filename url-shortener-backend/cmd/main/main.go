package main

import (
	"log"
	"net/http"


)

func main() {
	// Connect to the database
	db, err := gorm.Open(sqlite.Open("url_shortener.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Migrate the schema
	db.AutoMigrate(&models.ShortURL{})

	// Initialize the router
	r := gin.Default()

	// Initialize handlers
	h := handlers.NewHandler(db)

	// Routes
	r.POST("/api/shorten", h.CreateShortURL)
	r.GET("/:shortURL", h.RedirectShortURL)

	// Start the server
	if err := http.ListenAndServe(":8080", r); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}