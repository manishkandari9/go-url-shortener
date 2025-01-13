package main

import (
	"fmt"
	"log"
	"net/http"
	"url-shortener/config"

	"github.com/rs/cors" // Importing the CORS package
)

func main() {
	// Initialize MongoDB client
	err := database.InitMongoClient()
	if err != nil {
		log.Fatalf("Error initializing MongoDB: %v", err)
	}
	defer database.CloseMongoClient()

	// Set up CORS middleware with allowed origins
	corsHandler := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"}, // React app URL
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"}, // Allowed HTTP methods
		AllowedHeaders: []string{"Content-Type"}, // Allowed headers
	})

	// Set up your HTTP handler (example endpoint)
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Connected to MongoDB successfully!")
	})


	// Apply CORS middleware to the server
	log.Println("Server is running on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", corsHandler.Handler(http.DefaultServeMux)))
}



