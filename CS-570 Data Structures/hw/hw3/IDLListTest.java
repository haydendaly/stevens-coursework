import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

class IDLListTest {

	@Test
	void testCreation() {
		IDLList<Integer> test1 = new IDLList<>();
		test1.add(1);
		test1.add(2);
		test1.add(4);
		test1.append(5);
		test1.add(1, 3);
		assertEquals(test1.getHead(), 4, ".getHead() function returns incorrect value");
		assertEquals(test1.get(1), 3, ".get(index) function returns incorrect value");
		assertEquals(test1.get(2), 2, ".get(index) function returns incorrect value");
		assertEquals(test1.get(3), 1, ".get(index) function returns incorrect value");
		assertEquals(test1.getLast(), 5, ".getLast() function returns incorrect value");
		assertEquals(test1.size(), 5, ".size() function returns incorrect value");
	}
	
	@Test
	void testRemoval() {
		IDLList<Integer> test2 = new IDLList<>();
		test2.add(1);
		test2.add(2);
		test2.add(4);
		test2.append(5);
		test2.add(1, 3);
		assertEquals(test2.toString(), "4, 3, 2, 1, 5", ".toString() function returns incorrect value.");
		test2.remove();
		test2.removeLast();
		test2.removeAt(1);
		assertEquals(test2.size(), 2, ".size() function returns incorrect value.");
		assertEquals(test2.getHead(), 3, ".getHead() function returns incorrect value.");
		assertEquals(test2.getLast(), 1, ".getLast() function returns incorrect value.");
		test2.remove(3);
		assertEquals(test2.size(), 1, ".size() function returns incorrect value.");
		assertEquals(test2.getHead(), 1, ".getHead() function returns incorrect value.");
		assertEquals(test2.getLast(), 1, ".getLast() function returns incorrect value.");
	}
	
	

}
