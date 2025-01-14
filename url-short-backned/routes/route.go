package routes

import (
    "net/http"
    "url-short-backned/controllers"  // Import the controller
    "github.com/gorilla/mux"
)

// RegisterRoutes sets up the routes for the URL shortener.
func RegisterRoutes(r *mux.Router) {
    r.HandleFunc("/api/shorten", controllers.ShortenURL).Methods(http.MethodPost) // POST /api/shorten
}
