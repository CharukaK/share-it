FROM golang:1.22 as backend
WORKDIR /app
COPY cmd cmd
COPY go.mod . 
COPY go.sum . 
COPY Makefile . 
RUN make build-backend

FROM node:18 as frontend
WORKDIR /app
COPY web web
WORKDIR /app/web
RUN npm i && npm run build


FROM ubuntu:latest
USER 10014
WORKDIR /app
COPY --from=frontend /app/web/dist /app/web/dist
COPY --from=backend /app/bin /app/bin
EXPOSE 8080
# # ENTRYPOINT [ "./bin/main" ]
ENTRYPOINT [ "/app/bin/main" ]

