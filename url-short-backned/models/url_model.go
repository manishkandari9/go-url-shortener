package models

// ShortenRequest is the request format for shortening the URL
type ShortenRequest struct {
    URL string `json:"url"`
}

// ShortenResponse is the response format for the shortened URL
type ShortenResponse struct {
    ShortUrl string `json:"shortUrl"`
}
