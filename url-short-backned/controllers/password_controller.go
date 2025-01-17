package controllers

import (
	"encoding/json"
	"net/http"
	"url-short-backned/models"
	"url-short-backned/utils"
)

// CreateProtectedURL creates a password-protected URL and stores it in MongoDB
func CreateProtectedURL(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var requestData struct {
		URL      string `json:"url"`
		Password string `json:"password"`
	}

	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil || requestData.URL == "" || len(requestData.Password) < 6 {
		http.Error(w, `{"error":"Invalid request. Ensure URL is valid and password is at least 6 characters long."}`, http.StatusBadRequest)
		return
	}

	// Generate a short URL
	shortURL := utils.GenerateShortURL()

	// Store the password-protected URL in MongoDB
	if err := models.StorePasswordProtectedURL(shortURL, requestData.URL, requestData.Password); err != nil {
		http.Error(w, `{"error":"Failed to save URL"}`, http.StatusInternalServerError)
		return
	}

	// Respond with the short URL
	json.NewEncoder(w).Encode(map[string]string{"shortUrl": "http://localhost:8080/" + shortURL})
}

// RedirectProtectedURL redirects to the original URL if the correct password is provided
func RedirectProtectedURL(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Extract the short URL from the request
	shortURL := r.URL.Path[1:]

	// Get password from request body
	var requestData struct {
		Password string `json:"password"`
	}

	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil || requestData.Password == "" {
		http.Error(w, `{"error":"Password is required"}`, http.StatusBadRequest)
		return
	}

	// Retrieve the original URL from the database by matching short URL and password
	originalURL, valid := models.RetrieveURLByPassword(shortURL, requestData.Password)
	if !valid {
		http.Error(w, `{"error":"Invalid password or URL not found"}`, http.StatusUnauthorized)
		return
	}

	// Redirect to the original URL
	http.Redirect(w, r, originalURL, http.StatusFound)
}
