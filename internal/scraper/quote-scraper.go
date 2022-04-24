package scraper

import (
	"github.com/gocolly/colly/v2"
	"math/rand"
	"strconv"
	"strings"
	"time"
)

func QuoteScraper() (string, string) {
	c := colly.NewCollector()
	var quotes, authors []string
	c.OnHTML(".quote", func(e *colly.HTMLElement) {
		quotes = append(quotes, e.ChildText(".text"))
		authors = append(authors, e.ChildText(".author"))
	})
	s1 := rand.NewSource(time.Now().UnixNano())
	r1 := rand.New(s1).Intn(10)
	page := "https://quotes.toscrape.com/page/" + strconv.Itoa(r1) + "/"
	err := c.Visit(page)
	if err != nil {
		return "Bea Cukai Makin Baik", "Bea Cukai"
	}
	if len(quotes) > 0 && len(quotes) == len(authors) {
		r2 := rand.New(s1).Intn(len(quotes))
		quote := quotes[r2]
		return strings.ReplaceAll(strings.ReplaceAll(quote, "“", ""), "”", ""), authors[r2]
	} else {
		return "Bea Cukai Makin Baik", "Bea Cukai"
	}
}
