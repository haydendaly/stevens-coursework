/**
 * I pledge my honor I have abided by the Stevens Honor System. - Hayden C. Daly
 */

import java.util.Map;
import java.util.ArrayList;
import java.io.IOException;
import java.io.FileInputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;

public class Anagrams {

	/**
	 * Data primes is initialized as array of first 26 primes.
	 */
	final Integer[] primes = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101};
	Map<Character, Integer> letterTable;
	Map<Long, ArrayList<String>> anagramTable;

	/**
	 * Constructor builds letterTable and initializes anagramTable.
	 */
	public Anagrams() {
		buildLetterTable();
		anagramTable = new HashMap<Long, ArrayList<String>>();
	}

	/**
	 * Constructs a table of letters "a"-"z" and their corresponding prime values.
	 */
	private void buildLetterTable() {
		letterTable = new HashMap<Character, Integer>();
		for (char start = 'a'; start <= 'z'; start++) {
			letterTable.put(start, primes[Character.getNumericValue(start)-10]);
		}
	}

	/**
	 * Adds a word to the anagramTable. Checks if the table already contains the value and then adds the provided string if it does. If it doesn't, adds a string and a corresponding hashcode to the table.
	 * @param s Takes in a word to be added to the anagramTable.
	 */
	private void addWord(String s) {
		long code = myHashCode(s);
		if(anagramTable.containsKey(code)) {
			anagramTable.get(code).add(s);
		} else {
			ArrayList<String> newList = new ArrayList<String>();
			newList.add(s);
			anagramTable.put(code, newList);
		}
	}

	/**
	 * Generates a hashcode for a provided string using letterTable.
	 * @param s String to generate hashcode for.
	 * @return Long returned of value of hashcode.
	 */
	private Long myHashCode(String s) {
		long code = 1;
		for (char letter : s.toCharArray()) {
			code *= letterTable.get(letter);
		}
		return code;
	}

	/**
	 * Processes the file of the provided title in the local directory.
	 * @param s String name of file to be parsed.
	 * @throws IOException if file is not in directory.
	 */
	private void processFile(String s) throws IOException {
		FileInputStream fstream = new FileInputStream(s);
		BufferedReader br = new BufferedReader(new InputStreamReader(fstream));
		String strLine;
		while ((strLine = br.readLine()) != null) {
			this.addWord(strLine);
		}
		br.close();
	}

	/**
	 * Gets the max entry existing within the anagram hashtable.
	 * @return A map of the key and respective list
	 */
	private ArrayList<Map.Entry<Long, ArrayList<String>>> getMaxEntries() {
		int size = 0;
		ArrayList<Map.Entry<Long,ArrayList<String>>> maxList = new ArrayList<Map.Entry<Long,ArrayList<String>>>();
		for (Map.Entry<Long,ArrayList<String>> pair : anagramTable.entrySet()) {
			int entrySize = pair.getValue().size();
			if(entrySize > size) {
				maxList.clear();
				maxList.add(pair);
				size = entrySize;
			} else if(entrySize == size) {
				maxList.add(pair);
			}
		}
		return maxList;
	}

	/**
	 * Note: Changed main statement to match output format shown in assignment details
	 */
	public static void main(String[] args) {
		Anagrams a = new Anagrams ();
		final long startTime = System.nanoTime(); try {
			a.processFile("words_alpha.txt");
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		ArrayList<Map.Entry<Long, ArrayList<String>>> maxEntries = a.getMaxEntries();
		final long estimatedTime = System.nanoTime() - startTime;
		final double seconds = ((double) estimatedTime/1000000000);
		long key = 0;
		ArrayList<String> listMaxAnagrams = new ArrayList<String>();
		for (Map.Entry<Long, ArrayList<String>> entry : maxEntries) {
			key = entry.getKey();
			listMaxAnagrams = entry.getValue();
		}
		System.out.println("Elapsed Time: " + seconds);
		System.out.println("Key of max anagrams: " + key);
		System.out.println("List of max anagrams: " + listMaxAnagrams);
		System.out.println("Length of list of max anagrams: " + listMaxAnagrams.size());
	}
}
