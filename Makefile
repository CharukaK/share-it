build-backend:
	go build -o bin/main cmd/main.go

build-frontend:
	cd web/ && npm i && npm run build

build:
	go build -o bin/main cmd/main.go
	
