package routes

import (
    "url-short-backned/controllers"  
    "github.com/gorilla/mux"
)

func RegisterRoutes(r *mux.Router) {
    r.HandleFunc("/api/shorten", controllers.ShortenURL).Methods("POST") // Register the POST handler for /api/shorten
}
