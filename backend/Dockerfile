FROM alpine as base
RUN apk add --no-cache ca-certificates postgresql-client curl tini bash gnupg

FROM golang:alpine as builder
ENV GO111MODULE=on

RUN mkdir -p /app/
WORKDIR /app
ADD go.mod .
ADD go.sum .
RUN go mod download

ADD . .
RUN go build -o app cmd/app/app.go
RUN go build -o bun cmd/bun/main.go

FROM base as prod
ENTRYPOINT ["/sbin/tini", "--"]
ENV GO_ENV=production
EXPOSE 1323

WORKDIR /app
COPY --from=builder /app/app /app/bun ./
RUN touch .env

CMD /app/bun db init && /app/bun db migrate && exec /app/app
