package models

import (
	"errors"
	"fmt"
	"sync"
	"golang.org/x/crypto/bcrypt"
)

// PasswordProtectedURL struct for storing short URL, original URL, and associated password
type PasswordProtectedURL struct {
	ShortURL    string
	OriginalURL string
	Password    string // This will store the hashed password
	CreatedAt   string // Optional field for storing creation date
}

// Thread-safe in-memory storage for URLs
var urlStore = struct {
	sync.RWMutex
	urls map[string]PasswordProtectedURL
}{
	urls: make(map[string]PasswordProtectedURL),
}

// StorePasswordProtectedURL stores a password-protected short URL in the store with password hashing
func StorePasswordProtectedURL(shortURL, originalURL, password string) error {
	if password == "" {
		return errors.New("password is required to protect the URL")
	}

	// Hash the password before saving it
	hashedPassword, err := hashPassword(password)
	if err != nil {
		return fmt.Errorf("error hashing password: %v", err)
	}

	urlStore.Lock()
	defer urlStore.Unlock()

	// Check if the short URL already exists
	if _, exists := urlStore.urls[shortURL]; exists {
		return fmt.Errorf("short URL '%s' already exists", shortURL)
	}

	// Save the short URL with the hashed password
	urlStore.urls[shortURL] = PasswordProtectedURL{
		ShortURL:    shortURL,
		OriginalURL: originalURL,
		Password:    hashedPassword, // Store hashed password
	}

	return nil
}

// RetrieveURLByPassword retrieves the original URL by validating the password
func RetrieveURLByPassword(shortURL, password string) (string, bool) {
	urlStore.RLock()
	defer urlStore.RUnlock()

	// Check if the short URL exists
	url, exists := urlStore.urls[shortURL]
	if !exists {
		return "", false
	}

	// Validate the password by comparing the hashed password
	if !validatePassword(password, url.Password) {
		return "", false
	}

	// Return the original URL on successful password match
	return url.OriginalURL, true
}

// hashPassword hashes the password using bcrypt
func hashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

// validatePassword compares the provided password with the stored hashed password
func validatePassword(providedPassword, storedHashedPassword string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(storedHashedPassword), []byte(providedPassword))
	return err == nil
}
