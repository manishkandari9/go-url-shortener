package models

import (
	"context"
	"errors"
	"fmt"
	"url-short-backned/config"
	"golang.org/x/crypto/bcrypt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var URLCollection *mongo.Collection = config.Client.Database("urlshortener").Collection("password_protected_urls")

type PasswordProtectedURL struct {
	ShortURL    string `bson:"shortURL"`
	OriginalURL string `bson:"originalURL"`
	Password    string `bson:"password"`
}

// StorePasswordProtectedURL saves a password-protected URL to the MongoDB database
func StorePasswordProtectedURL(shortURL, originalURL, password string) error {
	// Hash the password before storing
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	// Check if the short URL already exists in the database
	var existingURL PasswordProtectedURL
	err = urlCollection.FindOne(context.Background(), bson.M{"shortURL": shortURL}).Decode(&existingURL)
	if err != mongo.ErrNoDocuments {
		// If error is not "no documents", return an error indicating the URL already exists
		return errors.New("short URL already exists")
	}

	// Create a new URL object to insert
	url := PasswordProtectedURL{
		ShortURL:    shortURL,
		OriginalURL: originalURL,
		Password:    string(hashedPassword),
	}

	// Insert the new URL into MongoDB
	_, err = urlCollection.InsertOne(context.Background(), url)
	if err != nil {
		return fmt.Errorf("failed to insert URL: %v", err)
	}

	return nil
}

// RetrieveURLByPassword retrieves the original URL if the provided password is correct
func RetrieveURLByPassword(shortURL, password string) (string, bool) {
	// Find the URL by short URL
	var urlData PasswordProtectedURL
	err := urlCollection.FindOne(context.Background(), bson.M{"shortURL": shortURL}).Decode(&urlData)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return "", false // URL not found
		}
		return "", false // Other errors
	}

	// Compare the provided password with the hashed password
	if err := bcrypt.CompareHashAndPassword([]byte(urlData.Password), []byte(password)); err != nil {
		return "", false // Password is incorrect
	}

	// If the password is correct, return the original URL
	return urlData.OriginalURL, true
}
