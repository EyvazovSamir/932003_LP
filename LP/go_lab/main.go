package main

import (
	"fmt"
	"time"
)

type Message struct {
	Data      string
	Recipient int
	TTL       int
}

type Nodering struct {
	id     int
	input  chan Message
	output chan Message
}

type networkTokenring struct {
	Nodes []*Nodering
}

func initialize(N int) *networkTokenring {
	network := &networkTokenring{}
	network.Nodes = make([]*Nodering, N)

	for i := 0; i < N; i++ {
		network.Nodes[i] = &Nodering{
			id:     i,
			input:  make(chan Message),
			output: make(chan Message),
		}
		go network.runNode(network.Nodes[i])
	}
	for i := 0; i < N; i++ {
		network.Nodes[i].connect(network.Nodes[(i+1)%N], network.Nodes[(i-1+N)%N])
	}

	return network
}

func (n *Nodering) connect(next, prev *Nodering) {
	go func() {
		for message := range n.input {
			next.output <- message
		}
	}()

	go func() {
		for message := range prev.output {
			n.input <- message
		}
	}()
}

func (network *networkTokenring) runNode(node *Nodering) {
	for message := range node.input {
		if message.Recipient == node.id {
			fmt.Printf("Message for node number %d : %s\n", node.id, message.Data)
		} else {
			node.output <- message
		}
	}
}

func (network *networkTokenring) SendMessageToSpecificNode(data string, recipient int, ttl int) {
	message := Message{
		Data:      data,
		Recipient: recipient,
		TTL:       ttl,
	}
	network.Nodes[0].input <- message
}

func main() {

	var N, recipient, ttl int

	fmt.Print("Enter the number of nodes: ")
	fmt.Scan(&N)

	network := initialize(N)

	fmt.Print("Enter recipient node (0 to N-1): ")
	fmt.Scan(&recipient)

	fmt.Print("Enter TTL (time to live): ")
	fmt.Scan(&ttl)

	message := fmt.Sprintf("Hello,nodes %d!", recipient)

	network.SendMessageToSpecificNode(message, recipient, ttl)

	time.Sleep(5 * time.Second)
}
