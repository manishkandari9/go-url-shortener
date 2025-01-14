package services

import (
    "fmt"
    "math/rand"
    "time"
)

// GenerateShortURL generates a random short URL based on the provided long URL.
func GenerateShortURL(longURL string) (string, error) {
    rand.Seed(time.Now().UnixNano())
    shortCode := fmt.Sprintf("%06d", rand.Intn(1000000)) // 6 digit random number
    
    // You can replace this URL with your own domain
    shortUrl := fmt.Sprintf("http://short.url/%s", shortCode)
    return shortUrl, nil
}
