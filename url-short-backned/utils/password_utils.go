package utils

import (
	"crypto/rand"
	"encoding/base64"
)

// GenerateShortURL creates a random short URL
func GenerateShortsURL() string {
	bytes := make([]byte, 6)
	_, _ = rand.Read(bytes)
	return base64.URLEncoding.EncodeToString(bytes)
}
