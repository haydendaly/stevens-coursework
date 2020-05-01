/*
 * Developed by Hayden C. Daly
 * I pledge my honor I have abided by the Stevens Honor System.
 */

public class Complexity {
	// Global variables initialized
	private static int counter2;

	// O(n)
	public static void method0(int n) {
		int counter = 0;
		for (int i = 0; i < n; i++) {
			System.out.println("Operation "+counter);
			counter++;
		}
	}

	// O(n^2)
	public static void method1(int n) {
		int counter = 0;
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < n; j++) {
				System.out.println("Operation: "+counter);
				counter++;
			}
		}
	}

	// O(n^3)
	public static void method2(int n) {
		int counter = 0;
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < n; j++) {
				for (int k = 0; k < n; k++) {
					System.out.println("Operation: "+counter);
					counter++;
				}
			}
		}
	}

	// O(logn)
	public static void method3(int n) {
		int counter = 0;
		for (int i = 1; i < n; i *= 2) {
			System.out.println("Operation: "+counter);
			counter++;
		}
	}

	// O(nlogn)
	public static void method4(int n) {
		int counter = 0;
		for (int i = 0; i < n; i++) {
			for (int j = 1; j < n; j *= 2) {
				System.out.println("Operation: "+counter);
				counter++;
			}
		}
	}

	// O(loglogn)
	public static void method5(int n) {
		int counter = 0;
		for (int i = 2; i < n; i *= i) {
			System.out.println("Operation: "+counter);
			counter++;
		}
	}

	// O(2^n)
	public static int method6(int n) {
		counter2++;
		System.out.println("Operation: "+counter2);
		if (n == 1) {
			return n;
		} else {
			return method6(n-1) * method6(n-1);
		}
	}

}
