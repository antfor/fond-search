package main

import (
	"context"
	"fmt"
	"net"
	"os"
	"runtime"
	"strconv"

	"golang.org/x/sync/semaphore"
)

const maxConections int64 = 10 // Max number of connections

var sem = semaphore.NewWeighted(maxConections) // Cap the number of goroutines to maxConnections
var ctx context.Context

func getPort() int {

	sPort := "8080"

	if len(os.Args) > 1 {
		sPort = os.Args[1]
	}

	portNum, err := strconv.Atoi(sPort)

	if err != nil || portNum < 0 || portNum > 65535 {
		return -1
	}

	return portNum
}

func main() {

	ctx = context.Background()

	port := getPort()

	if port == -1 {
		fmt.Println("cant open port: ")
	}

	fmt.Println("Selected port:", port)
}

/*
Listen to the given port. For every new connection, spawn a Goroutine, at most 10

Otherwise throw a panic
*/
func listen(port int) {

	l, err := net.Listen("tcp", ":"+strconv.Itoa(port))

	if err != nil {
		panic("Could not listen to port")
	}

	defer l.Close()

	for {
		conn, err := l.Accept()

		if err != nil {
			panic("Error in accepting connection")
		}

		fmt.Println("Accepted connection")
		fmt.Println(runtime.NumGoroutine())

		sem.Acquire(ctx, 1)

		go func() {

			defer conn.Close()
			defer sem.Release(1)

			fmt.Println("Serve connection")
			router.handleConnection(conn)

			fmt.Println("Done")

		}()

	}
}
