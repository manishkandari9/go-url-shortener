package routes

import (
	"url-short-backned/controllers"
	"github.com/gorilla/mux"
)

func SetupRoutes() *mux.Router {
	router := mux.NewRouter()

	// Register routes
	router.HandleFunc("/api/shorten", controllers.ShortenURL).Methods("POST")
	router.HandleFunc("/{shortURL}", controllers.RedirectURL).Methods("GET")

	return router
}
