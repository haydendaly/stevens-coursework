import java.util.ArrayList;
import java.lang.ArrayIndexOutOfBoundsException;

public class IDLList<E> {

	private class Node<E>{
		private E data;
		private Node<E> next;
		private Node<E> prev;
		
		private Node (E elem) {
			this.data = elem;
			this.next = null;
			this.prev = null;
		}
		
		private Node (E elem, Node<E> prev, Node<E> next) {
			this.data = elem;
			this.next = next;
			this.prev = prev;
		}
	}
	
	private Node<E> head, tail;
	private int size = 0;
	private ArrayList<Node<E>> indices;
	
	public IDLList() {
		head = new Node<>(null, null, null);
		tail = new Node<>(null, head, null);
		head.next = tail;
		indices = new ArrayList<Node<E>>();
	}

	public boolean add(int index, E elem) {
		if (size >= index + 1) {
			Node<E> newNode = new Node<>(elem, indices.get(index).prev, indices.get(index));
			indices.get(index).prev.next = newNode;
			indices.get(index).prev = newNode;
			indices.add(index, newNode);
			size++;
			return true;
		} else {
			throw new ArrayIndexOutOfBoundsException("Does not have index: "+index);
		}
	}
	
	public boolean add(E elem) {
		Node<E> newNode = new Node<>(elem, head, head.next);
		size++;
		head.next.prev = newNode;
		head.next = newNode;
		indices.add(0, newNode);
		return true;
	}
	
	public boolean append(E elem) {
		Node<E> newNode = new Node<E>(elem, tail.prev, tail);
		size++;
		tail.prev.next = newNode;
		tail.prev = newNode;
		indices.add(newNode);
		return true;
	}
	
	public E get(int index) {
		return indices.get(index).data;
	}
	
	public E getHead() {
		return head.next.data;
	}
	
	public E getLast() {
		return tail.prev.data;
	}
	
	public int size() {
		return size;
	}
	
	public E remove() {
		if (size > 0) {
			Node<E> temp = head.next;
			head.next = head.next.next;
			head.next.prev = head;
			indices.remove(0);
			size--;
			return temp.data;
		} else {
			throw new ArrayIndexOutOfBoundsException("Does not have any elements.");
		}
	}
	
	public E removeLast() {
		if (size > 0) {
			Node<E> temp = indices.get(size-1);
			indices.get(size-1).prev.next = tail;
			tail.prev = indices.get(size-1).prev;
			indices.remove(size-1);
			size--;
			return temp.data;
		} else {
			throw new ArrayIndexOutOfBoundsException("Does not have any elements.");
		}
	}
	
	public E removeAt(int index) {
		if (size > index) {
			E data = indices.get(index).data;
			indices.get(index).prev.next = indices.get(index).next;
			indices.get(index).next.prev = indices.get(index).prev;
			indices.remove(index);
			size--;
			return data;
		} else {
			throw new ArrayIndexOutOfBoundsException("Does not have index: "+index);
		}
	}
	
	public boolean remove(Object elem) {
		Node<E> current = head.next;
		for (int i = 0; i < size; i++) {
			if (current.data == elem) {
				indices.get(i).prev.next = indices.get(i).next;
				indices.get(i).next.prev = indices.get(i).prev;
				indices.remove(i);
				size--;
				return true;
			}
			current = current.next;
		}
		return false;
	}
	
	public String toString() {
		Node<E> current = head.next;
		int i = 0;
		String response = "";
		while (i < size) {
			response = response.concat(current.data.toString());
			if (i < size -1) {
				response = response.concat(", ");
			}
			i++;
			current = current.next;
		}
		return response;
	}
	
}
