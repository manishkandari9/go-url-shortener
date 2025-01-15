package main

import (
	"log"
	"net/http"
	"url-short-backned/config"
	"url-short-backned/routes"
	"github.com/rs/cors"
)

func main() {
	// Initialize MongoDB client (If you need MongoDB functionality)
	err := config.InitMongoClient()
	if err != nil {
		log.Fatalf("Error initializing MongoDB: %v", err)
	}
	defer config.CloseMongoClient()

	// Set up CORS middleware with allowed origins
	corsHandler := cors.New(cors.Options{
        AllowedOrigins: []string{
            "http://localhost:3000", // React app (old default port)
            "http://localhost:5173", // Vite React app (new port)
        },  // React app URL
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"}, // Allowed HTTP methods
		AllowedHeaders: []string{"Content-Type"}, // Allowed headers
	})

	// Set up the router with routes defined in the routes package
	r := routes.SetupRoutes() // Use the correct function name

	// Start the server with CORS middleware
	log.Println("Server is running on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", corsHandler.Handler(r))) // Apply CORS middleware to router
}
