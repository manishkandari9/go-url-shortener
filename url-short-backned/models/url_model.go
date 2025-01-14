package models

// ShortenRequest represents the structure of the incoming request (long URL).
type ShortenRequest struct {
    URL string `json:"url"`
}

// ShortenResponse represents the structure of the outgoing response (short URL).
type ShortenResponse struct {
    ShortUrl string `json:"shortUrl"`
}
