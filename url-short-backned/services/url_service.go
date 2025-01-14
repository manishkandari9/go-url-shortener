package services

import (
    "fmt"
    "math/rand"
    "time"
)

func GenerateShortURL(longURL string) (string, error) {
    // Simulate short URL generation
    rand.Seed(time.Now().UnixNano())
    shortCode := fmt.Sprintf("%06d", rand.Intn(1000000))

    // Construct the short URL (adjust domain as needed)
    shortUrl := fmt.Sprintf("http://short.url/%s", shortCode)
    return shortUrl, nil
}
