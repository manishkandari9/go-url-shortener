package routes

import (
	"net/http"
	"url-short-backned/controllers"

	"github.com/gorilla/mux"
)

// InitializePasswordRoutes sets up routes for password-protected URLs
func InitializePasswordRoutes(router *mux.Router) {
	// Route for creating a password-protected short URL
	router.HandleFunc("/create", controllers.CreateProtectedURL).Methods("POST")

	// Route for redirecting to the original URL after password validation
	router.HandleFunc("/{shortURL}", controllers.RedirectProtectedURL).Methods("POST")

	// Add a default route to handle invalid paths within the password-related routes
	router.NotFoundHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.Error(w, `{"error": "Route not found"}`, http.StatusNotFound)
	})
}
