package simulator;
public class MyQueue<E> {
    //Node class for single linked list queue
    private static class Node<E> {
        //Instance variables for Node
        private E data;
        private Node next;

        //Constructor for Node, to be completed by you
        private Node(E dataItem) {
        	data = dataItem;
        }

        //Constructor for Node, to be completed by you
        private Node(E dataItem, Node<E> nodeRef) {
        	data = dataItem;
        	next = nodeRef;
        }
    }

    //Instance variables for queue
    private Node<E> front;
    private Node<E> rear;
    private int size;

    //Constructor for queue, to be completed by you
    public MyQueue () {
    	front = null;
    	size = 0;
    }

    //Adds a node to queue, to be completed by you
    public boolean offer(E item) {
    	if (size == 0) {
    		front = new Node<E>(null);
    	} else {
    		if (rear != null) {
    			rear.next = new Node<E>(item, null);
    			rear = rear.next;
    		} else {
    			rear = new Node<E>(item, null);
    			front.next = rear;
    		}
    	}
    	size++;
    	return true;
    }

    //Returns the node at front of queue, to be completed by you
    public E peek() {
    	return front.data;
    }

    //Returns and removes the node at front of queue, to be completed by you
    public E poll() {
    	if (size > 0) {
    		E data = peek();
    		front = front.next;
    		size--;
    		return data;
    	} else {
    		front.data = null;
    		return front.data;
    	}
    }

    //Returns the data element at a specific index, to be completed by you
    public E get(int index) {
    	if (index > size || index < 0) {
    		throw new IndexOutOfBoundsException();
    	}
    	Node<E> current = front;
    	while (current.next != null) {
    		current = current.next;
    	}
    	return current.data;
    }

    //Returns the size of the queue, to be completed by you
    public int size() {
    	return size;
    }
}
