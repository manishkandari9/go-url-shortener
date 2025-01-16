package controllers

import (
	"encoding/json"
	"net/http"
	"url-short-backned/models"
	"url-short-backned/utils"
)

// CreateProtectedURL handles the creation of a password-protected short URL
func CreateProtectedURL(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var requestData struct {
		URL      string `json:"url"`
		Password string `json:"password"`
	}

	// Decode request body
	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil || requestData.URL == "" || len(requestData.Password) < 6 {
		http.Error(w, `{"error":"Invalid request. Ensure URL is valid and password is at least 6 characters long."}`, http.StatusBadRequest)
		return
	}

	originalURL := requestData.URL
	password := requestData.Password
	shortURL := utils.GenerateShortURL()

	// Save URL and password in the model
	if err := models.StorePasswordProtectedURL(shortURL, originalURL, password); err != nil {
		http.Error(w, `{"error":"Failed to save URL"}`, http.StatusInternalServerError)
		return
	}

	// Return the short URL
	responseData := map[string]string{"shortUrl": "http://localhost:8080/" + shortURL}
	json.NewEncoder(w).Encode(responseData)
}

// RedirectProtectedURL handles the redirection to the original URL after password validation
func RedirectProtectedURL(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Extract short URL and password
	shortURL := r.URL.Path[1:]
	var requestData struct {
		Password string `json:"password"`
	}

	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil || requestData.Password == "" {
		http.Error(w, `{"error":"Password is required"}`, http.StatusBadRequest)
		return
	}

	// Validate password and retrieve the original URL
	originalURL, valid := models.RetrieveURLByPassword(shortURL, requestData.Password)
	if !valid {
		http.Error(w, `{"error":"Invalid password or URL not found"}`, http.StatusUnauthorized)
		return
	}

	// Redirect to the original URL
	http.Redirect(w, r, originalURL, http.StatusFound)
}
