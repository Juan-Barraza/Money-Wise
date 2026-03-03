FROM golang:1.25-alpine AS builder

WORKDIR /moneyApp

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN go build -o moneyWiseApp ./

FROM alpine:latest

WORKDIR /app

COPY --from=builder /moneyApp/moneyWiseApp /app/moneyWiseApp

EXPOSE 8000

ENTRYPOINT [ "./moneyWiseApp" ]
