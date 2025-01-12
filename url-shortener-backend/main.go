package main

import (
	"fmt"
	"log"
	"net/http"
	"url-shortener/internal/database"

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

	// Your route for URL shortening (add your logic here)
	http.HandleFunc("/api/shorten", shortenHandler)

	// Apply CORS middleware to the server
	log.Println("Server is running on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", corsHandler.Handler(http.DefaultServeMux)))
}

// Sample handler for shortening URLs (you will need to implement your own logic here)
func shortenHandler(w http.ResponseWriter, r *http.Request) {
	// Your logic for shortening URLs (this will use MongoDB for storage)
	// For example, you can read the URL from the request and return a shortened URL.
	fmt.Fprintf(w, "This is where the URL shortening logic will be.")
}
