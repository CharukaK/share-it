package main

import (
	"fmt"
	"log"
	"mime"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
)

func main() {
	loadMimeTypes()

	r := chi.NewRouter()
	r.Use(middleware.Logger)

	fs := http.FileServer(http.Dir("web/dist"))

	r.Handle("/*", fs)

    fmt.Println("Started listening on :8080 => http://127.0.0.1:8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}

func loadMimeTypes() {
	mime.AddExtensionType(".css", "text/css")
	mime.AddExtensionType(".js", "application/javascript")
}
