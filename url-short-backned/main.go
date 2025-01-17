package main

import (
	"log"
	"net/http"
	"url-short-backned/config"
	"url-short-backned/routes"

	"github.com/rs/cors"
)

func main() {
	// Initialize MongoDB client
	err := config.InitMongoClient()
	if err != nil {
		log.Fatalf("Error initializing MongoDB: %v", err)
	}
	defer config.CloseMongoClient()

	// Initialize the base router from SetupRoutes
	baseRouter := routes.SetupRoutes()

	// Initialize password-related routes on the same router
	routes.InitializePasswordRoutes(baseRouter)

	// Set up CORS middleware
	corsHandler := cors.New(cors.Options{
		AllowedOrigins: []string{
			"http://localhost:3000",
			"http://localhost:5173",
		},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders: []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	// Start the server with CORS middleware applied to the base router
	log.Println("Server is running on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", corsHandler.Handler(baseRouter)))
}
