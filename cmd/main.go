package main

import (
	"fmt"
	"log"
	"mime"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
)

var clients map[chan string]struct{}

func main() {
	loadMimeTypes()

	clients = make(map[chan string]struct{})
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	fs := http.FileServer(http.Dir("web/dist"))

	r.Handle("/*", fs)

	r.Get("/sse", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/event-stream")
		w.Header().Set("Cache-Control", "no-cache")
		w.Header().Set("Connection", "keep-alive")

		ch := make(chan string)
		broadcast(fmt.Sprintf("client connected, connections: %d", len(clients)+1))
		clients[ch] = struct{}{}
		w.(http.Flusher).Flush()
		defer func() {
			delete(clients, ch)
			broadcast(fmt.Sprintf("client disconnected, connections: %d", len(clients)))
		}()

		for {
			select {
			case v := <-ch:
				w.Write([]byte(v))
				w.(http.Flusher).Flush()
			case <-r.Context().Done():
				return
			}
		}
	})

	fmt.Println("Started listening on :8080 => http://127.0.0.1:8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}

func broadcast(msg string) {
	for ch := range clients {
		ch <- fmt.Sprintf("data: %s\n\n", msg)
	}
}

func loadMimeTypes() {
	mime.AddExtensionType(".css", "text/css")
	mime.AddExtensionType(".js", "application/javascript")
}
