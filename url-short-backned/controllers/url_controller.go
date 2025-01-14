package controllers

import (
    "encoding/json"
    "net/http"
    "url-short-backned/models"
    "url-short-backned/services"
)

// ShortenURL handles the URL shortening request
func ShortenURL(w http.ResponseWriter, r *http.Request) {
    var req models.ShortenRequest

    // Decode the request body to get the long URL
    err := json.NewDecoder(r.Body).Decode(&req)
    if err != nil || req.URL == "" {
        http.Error(w, "Invalid request body", http.StatusBadRequest)
        return
    }

    // Call the service to shorten the URL
    shortUrl, err := services.GenerateShortURL(req.URL)
    if err != nil {
        http.Error(w, "Failed to shorten URL", http.StatusInternalServerError)
        return
    }

    // Respond with the shortened URL
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(models.ShortenResponse{ShortUrl: shortUrl})
}
