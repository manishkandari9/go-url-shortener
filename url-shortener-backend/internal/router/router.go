package router

import (
    "net/http"
    "url-shortener/internal/handle"
    "github.com/gorilla/mux"
)

// Initialize sets up the HTTP routes
func Initialize() *mux.Router {
    r := mux.NewRouter()
    r.HandleFunc("/", handle.HomeHandler)
    // Add more routes as necessary
    return r
}
