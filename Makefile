build-backend:
	go build -o bin/main cmd/main.go

build-frontend:
	cd web/ && npm i && npm run build

build: build-backend build-frontend

run-build:
	cd web/ && npm run build
	go build -o bin/main cmd/main.go

