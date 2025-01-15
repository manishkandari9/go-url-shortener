package controllers

import (
	"encoding/json"
	"net/http"
	"url-short-backned/models"
	"url-short-backned/utils"
)

func ShortenURL(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var requestData map[string]string
	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil || requestData["url"] == "" {
		http.Error(w, `{"error":"Invalid request body"}`, http.StatusBadRequest)
		return
	}

	originalURL := requestData["url"]
	shortURL := utils.GenerateShortURL()

	if err := models.SaveURL(shortURL, originalURL); err != nil {
		http.Error(w, `{"error":"Failed to save URL"}`, http.StatusInternalServerError)
		return
	}

	responseData := map[string]string{"shortUrl": "http://localhost:8080/" + shortURL}
	json.NewEncoder(w).Encode(responseData)
}

func RedirectURL(w http.ResponseWriter, r *http.Request) {
	shortURL := r.URL.Path[1:]
	originalURL, exists := models.GetURL(shortURL)
	if !exists {
		http.Error(w, "URL not found", http.StatusNotFound)
		return
	}
	http.Redirect(w, r, originalURL, http.StatusFound)
}
