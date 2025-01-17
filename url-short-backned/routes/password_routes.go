package routes

import (
	"net/http"
	"url-short-backned/controllers"

	"github.com/gorilla/mux"
)

func InitializePasswordRoutes(router *mux.Router) {
	router.HandleFunc("/create", controllers.CreateProtectedURL).Methods("POST")
	router.HandleFunc("/{shortURL}", controllers.RedirectProtectedURL).Methods("POST")

	router.NotFoundHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.Error(w, `{"error":"Route not found"}`, http.StatusNotFound)
	})
}
