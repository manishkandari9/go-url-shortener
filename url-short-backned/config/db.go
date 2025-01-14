package config

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client

// Load environment variables from the .env file
func init() {
	// Load the .env file
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Initialize the MongoDB client
	err = InitMongoClient()
	if err != nil {
		log.Fatalf("Error initializing MongoDB client: %v", err)
	}
}

// InitMongoClient initializes the MongoDB client
func InitMongoClient() error {
	// Retrieve the MongoDB URI from the environment variable
	mongoURI := os.Getenv("MONGODB_URI")
	if mongoURI == "" {
		return fmt.Errorf("MongoDB URI is missing from environment variables")
	}

	// Set client options
	clientOptions := options.Client().ApplyURI(mongoURI).
	SetConnectTimeout(30 * time.Second)

	// Connect to MongoDB
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		return fmt.Errorf("failed to connect to MongoDB: %v", err)
	}

	// Check the connection
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err = client.Ping(ctx, nil)
	if err != nil {
		return fmt.Errorf("failed to ping MongoDB: %v", err)

	}

	// Store the client in a global variable
	Client = client
	fmt.Println("Successfully connected to MongoDB!")
	return nil
}

// CloseMongoClient closes the MongoDB connection
func CloseMongoClient() {
	if err := Client.Disconnect(context.Background()); err != nil {
		log.Fatalf("Error disconnecting from MongoDB: %v", err)
	} else {
		fmt.Println("Successfully disconnected from MongoDB!")
	}
}
