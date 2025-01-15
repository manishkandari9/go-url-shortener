package models

import (
	"context"
	"log"
	"time"
	"url-short-backned/config"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var urlCollection *mongo.Collection = config.Client.Database("urlShortener").Collection("urls")

type URL struct {
	ShortURL    string    `bson:"short_url"`
	OriginalURL string    `bson:"original_url"`
	CreatedAt   time.Time `bson:"created_at"`
}

func SaveURL(shortURL, originalURL string) error {
	url := URL{
		ShortURL:    shortURL,
		OriginalURL: originalURL,
		CreatedAt:   time.Now(),
	}
	if _, err := urlCollection.InsertOne(context.Background(), url); err != nil {
		log.Printf("Error saving URL: %v", err)
		return err
	}
	return nil
}

func GetURL(shortURL string) (string, bool) {
	var url URL
	if err := urlCollection.FindOne(context.Background(), bson.M{"short_url": shortURL}).Decode(&url); err != nil {
		log.Printf("Error retrieving URL: %v", err)
		return "", false
	}
	return url.OriginalURL, true
}