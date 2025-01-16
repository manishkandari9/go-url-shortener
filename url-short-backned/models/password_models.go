package models

import (
	"errors"
	"fmt"
	"sync"
)

// URL struct for storing short URL, original URL, and associated password
type URL struct {
	ShortURL    string
	OriginalURL string
	Password    string
}

// Thread-safe in-memory storage for URLs
var urlStore = struct {
	sync.RWMutex
	urls map[string]URL
}{
	urls: make(map[string]URL),
}

// SaveURL stores a password-protected short URL in the store
func SaveURL(shortURL, originalURL, password string) error {
	// Ensure a password is provided
	if password == "" {
		return errors.New("password is required to protect the URL")
	}

	urlStore.Lock()
	defer urlStore.Unlock()

	// Check if the short URL already exists
	if _, exists := urlStore.urls[shortURL]; exists {
		return fmt.Errorf("short URL '%s' already exists", shortURL)
	}

	// Save the short URL with the password
	urlStore.urls[shortURL] = URL{
		ShortURL:    shortURL,
		OriginalURL: originalURL,
		Password:    password,
	}

	return nil
}

// GetURL retrieves the original URL by validating the password
func GetURL(shortURL, password string) (string, bool) {
	urlStore.RLock()
	defer urlStore.RUnlock()

	// Check if the short URL exists
	url, exists := urlStore.urls[shortURL]
	if !exists {
		return "", false
	}

	// Validate the password
	if url.Password != password {
		return "", false
	}

	// Return the original URL on successful password match
	return url.OriginalURL, true
}
