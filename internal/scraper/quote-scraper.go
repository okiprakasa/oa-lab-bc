package scraper

import (
	"github.com/gocolly/colly/v2"
	"math/rand"
	"strconv"
	"strings"
	"time"
)

//goland:noinspection SpellCheckingInspection
var quoteSlice = []string{"Jangan Pernah Lelah Mencintai Negeri Ini.",
	"Kurang cerdas bisa diperbaiki dengan belajar. Kurang cakap dapat dihilangkan dengan pengalaman. Namun tidak jujur itu sulit diperbaiki.",
	"Setiap orang menjadi guru, setiap rumah menjadi sekolah.",
	"Bermimpilah setinggi langit. Jika kamu jatuh, kamu akan jatuh di antara bintang-bintang.",
	"Kita tunjukan bahwa kita adalah benar-benar orang yang ingin merdeka, lebih baik kita hancur lebur daripada tidak merdeka.",
	"Bangsa yang tidak percaya kepada kekuatan dirinya sebagai suatu bangsa, tidak dapat berdiri sebagai suatu bangsa yang merdeka.",
	"Pahlawan yang setia itu berkorban bukan buat dikenal namanya, tetapi semata-mata membela cita-cita.",
	"Negeri ini, Republik Indonesia, bukanlah milik suatu golongan, bukan milik suatu agama, bukan milik suatu kelompok etnis, bukan juga milik suatu adat-istiadat tertentu, tapi milik kita semua dari Sabang sampai Merauke!",
	"Kadang kita terlalu sibuk memikirkan kesulitan-kesulitan sehingga kita tidak punya waktu untuk mensyukuri rahmat Tuhan.",
	"Banyak hal yang bisa menjatuhkanmu. Tapi, satu-satunya hal yang benar-benar dapat menjatuhkanmu adalah sikapmu sendiri.",
	"Kejahatan akan menang bila orang yang benar tidak melakukan apa-apa.",
	"Indonesia merdeka bukan tujuan akhir kita. Indonesia merdeka hanya syarat untuk bisa mencapai kebahagiaan dan kemakmuran rakyat.",
	"Kalau sistem itu tak bisa diperiksa kebenarannya dan tak bisa dikritik, maka matilah ilmu pasti itu.",
	"Jangan pernah berhenti dan jangan pernah lelah untuk memberikan yang terbaik dan melakukan inovasi serta kreativitas untuk mendukung tugas-tugas DJBC."}
var authorSlice = []string{"Sri Mulyani", "Mohammad Hatta", "Ki Hadjar Dewantara", "Soekarno", "Bung Tomo", "Soekarno", "Mohammad Hatta", "Soekarno", "Soedirman", "R.A. Kartini", "Soedirman", "Mohammad Hatta", "Tan Malaka", "Askolani"}

//QuoteScraper scrape quotes from quotes.toscrape.com on random page (1-10) and random n-th of quote found on the page
func QuoteScraper() (string, string) {
	c := colly.NewCollector()
	var quotes, authors []string
	c.OnHTML(".quote", func(e *colly.HTMLElement) {
		quotes = append(quotes, e.ChildText(".text"))
		authors = append(authors, e.ChildText(".author"))
	})
	t1 := rand.NewSource(time.Now().UnixNano())
	r1 := rand.New(t1).Intn(9) + 1 //will result of random number from 1 to 10
	ra := rand.New(t1).Intn(len(authorSlice) - 1)
	page := "https://quotes.toscrape.com/page/" + strconv.Itoa(r1)
	err := c.Visit(page)
	if err != nil {
		return quoteSlice[ra], authorSlice[ra]
	}
	if len(quotes) > 0 && len(quotes) == len(authors) {
		r2 := rand.New(t1).Intn(len(quotes) - 1) //error if len(quotes) = 0
		quote := quotes[r2]                      //error if indexing with len(quotes) not len(quotes) - 1 / index out of bond
		return strings.ReplaceAll(strings.ReplaceAll(quote, "“", ""), "”", ""), authors[r2]
	} else {
		return quoteSlice[ra], authorSlice[ra]
	}
}

// TimeLimiter limit how long QuoteScraper can run, otherwise return default value Bea Cukai Makin Baik
func TimeLimiter(expectedMs float64) (s1 string, s2 string) {
	done := make(chan struct{})
	go func() {
		s1, s2 = QuoteScraper()
		close(done)
	}()
	select {
	case <-done:
	case <-time.After(time.Duration(expectedMs) * time.Millisecond):
		t1 := rand.NewSource(time.Now().UnixNano())
		ra := rand.New(t1).Intn(len(authorSlice) - 1)
		s1 = quoteSlice[ra]
		s2 = authorSlice[ra]
	}
	return s1, s2
}
