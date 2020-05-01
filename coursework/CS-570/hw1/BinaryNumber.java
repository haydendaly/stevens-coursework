/*#################################################
Developed by: Hayden Daly
Course: CS 570B
Pledge: I pledge my honor I have abided by the Stevens Honor System. - Hayden C. Daly
#################################################*/

public class BinaryNumber {
	private int data[];
	private boolean overflow;

	public BinaryNumber(int length) {
		this.data = new int[length];
	}

	public BinaryNumber(String str) {
		this.data = new int[str.length()];
		for (int i = 0; i < str.length(); i++) {
			data[i] = Character.getNumericValue(str.charAt(i));
		}
	}

	public int getLength() {
		return data.length;
	}

	public int getDigit(int index) {
		if (index > data.length || index < 0) {
			System.out.println("Index out of bounds");
			return 0;
		} else {
			return data[index];
		}
	}

	public void shiftR(int amount) {
		this.data = addArrays(new int[amount], data);
	}

	private int[] addArrays(int[] array1, int[] array2) {
		int[] combinedArray = new int[array1.length + array2.length];
		System.arraycopy(array1, 0, combinedArray, 0, array1.length);
		System.arraycopy(array2, 0, combinedArray, array1.length, array2.length);
		return combinedArray;
	}

	public void add(BinaryNumber aBinaryNumber) {
		int[] array1, array2;
		if (aBinaryNumber.getLength() > data.length) {
			array1 = addArrays(this.data, new int[aBinaryNumber.getLength()-data.length]);
			array2 = aBinaryNumber.data;
		} else if (data.length > aBinaryNumber.getLength()) {
			array1 = addArrays(aBinaryNumber.data, new int[data.length-aBinaryNumber.getLength()]);
			array2 = this.data;
		} else {
			array1 = aBinaryNumber.data;
			array2 = this.data;
		}
		int[] finalNumber = new int[array1.length + 1];
		for (int i = 0; i < array1.length; i++) {
			int result = array1[i] + array2[i] + finalNumber[i];
			if (result == 2) {
				finalNumber[i] = 0;
				finalNumber[i+1] = 1;
			} else if (result == 3) {
				finalNumber[i] = 1;
				finalNumber[i+1] = 1;
			} else {
				finalNumber[i] = result;
			}
			if (finalNumber[finalNumber.length-1] == 1) {
				this.overflow = true;
				this.data = finalNumber;
			} else {
				this.data = java.util.Arrays.copyOf(finalNumber, finalNumber.length-2);
			}
		}
	}

	public String toString() {
		if (this.overflow == true) {
			return "Overflow";
		}
		StringBuilder str = new StringBuilder("");
		for (int i = 0; i < data.length; i++) {
			str.append(String.valueOf(data[i]));
		}
		return str.toString();
	}
	
	public int toDecimal() {
		int sum = 0;
		for (int i = 0; i < data.length; i++) {
			sum += data[i] * Math.pow(2, i);
		}
		return sum;
	}

	public void clearOverflow() {
		this.overflow = false;
	}

}
