build:
	cd web/ && npm i && npm run build
	go build -o bin/main cmd/main.go
	

run:
	cd web/ && npm i && npm run build
	go run cmd/main.go

