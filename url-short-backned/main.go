package main

import (
    "log"
    "net/http"
    "url-short-backned/config"
    "url-short-backned/routes"
    "github.com/gorilla/mux"
    "github.com/rs/cors"
)

func main() {
    // Initialize MongoDB client
    err := config.InitMongoClient()
    if err != nil {
        log.Fatalf("Error initializing MongoDB: %v", err)
    }
    defer config.CloseMongoClient()

    // Set up CORS middleware with allowed origins
    corsHandler := cors.New(cors.Options{
        AllowedOrigins: []string{"http://localhost:5373"}, // React app URL
        AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"}, // Allowed HTTP methods
        AllowedHeaders: []string{"Content-Type"}, // Allowed headers
    })

    // Initialize a new mux router
    r := mux.NewRouter()

    // Register the routes
    routes.RegisterRoutes(r)

    // Apply CORS middleware to the server and start it
    log.Println("Server is running on port 8080...")
    log.Fatal(http.ListenAndServe(":8080", corsHandler.Handler(r))) // Note: Use `r` instead of `http.DefaultServeMux`
}
