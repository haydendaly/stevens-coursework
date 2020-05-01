package Maze;
import java.util.ArrayList;
import java.util.Stack;

/**
 * Class that solves maze problems with backtracking.
 * @author Koffman and Wolfgang
 **/
public class Maze implements GridColors {

    /** The maze */
    private TwoDimGrid maze;

    public Maze(TwoDimGrid m) {
        maze = m;
    }

    /** Wrapper method. */
    public boolean findMazePath() {
        return findMazePath(0, 0); // (0, 0) is the start point.
    }

    /**
     * Attempts to find a path through point (x, y).
     * @pre Possible path cells are in BACKGROUND color;
     *      barrier cells are in ABNORMAL color.
     * @post If a path is found, all cells on it are set to the
     *       PATH color; all cells that were visited but are
     *       not on the path are in the TEMPORARY color.
     * @param x The x-coordinate of current point
     * @param y The y-coordinate of current point
     * @return If a path through (x, y) is found, true;
     *         otherwise, false
     */

    // COMPLETE HERE FOR PROBLEM 1
    public boolean findMazePath(int x, int y) {
    	int xCols = maze.getNCols();
    	int yRows = maze.getNRows();
    	if(!(x < xCols && y < yRows && x >= 0 && y >= 0)) {
    		return false;
    	} else if(x == --xCols && y == --yRows) {
    		maze.recolor(x, y, PATH);
    		return true;
    	} else if (!(maze.getColor(x, y) == NON_BACKGROUND)) {
    		return false;
    	}
    	maze.recolor(x, y, PATH);
    	if (findMazePath(x - 1, y) || findMazePath(x, y - 1) || findMazePath(x + 1, y) || findMazePath(x, y + 1)) {
    		return true;
    	}
    	maze.recolor(x, y, TEMPORARY);
    	return false;
    }

    // ADD METHOD FOR PROBLEM 2 HERE
    public ArrayList<ArrayList<PairInt>> findAllMazePaths(int x, int y) {
    	ArrayList<ArrayList<PairInt>> result = new ArrayList<>();
    	Stack<PairInt> trace = new Stack<>();
    	findMazePathStackBased(0, 0, result, trace);
    	return result;
    }

    // Helper function
    public void findMazePathStackBased(int x, int y, ArrayList<ArrayList<PairInt>> result, Stack<PairInt> trace) {
    	// Ends recursion if the coordinates are not on the grid
    	int xCols = maze.getNCols();
    	int yRows = maze.getNRows();
    	if(!(xCols > x && yRows > y && x >= 0 && y >= 0)) {
        	return;
    	}
        // Checks for maze completion and adds successful routes to result list.
        else if (x == --xCols && y == --yRows) {
        	ArrayList<PairInt> traceList = new ArrayList<PairInt>();
        	trace.push(new PairInt(x, y));
    		traceList.addAll(trace);
    		result.add(traceList);
    		trace.empty();
    		return;
        }
        // Ends recursion if the position on the grid isn't navigable
        else if(!(maze.getColor(x, y) == NON_BACKGROUND)) {
        	return;
    	}
    	// If on valid square, try all surrounding squares through recursive method.
    	trace.push(new PairInt(x,y));
    	Stack<PairInt> newTrace = trace;
    	maze.recolor(x, y, PATH);
		findMazePathStackBased(x - 1, y, result, newTrace);
		findMazePathStackBased(x, y - 1, result, newTrace);
		findMazePathStackBased(x + 1, y, result, newTrace);
		findMazePathStackBased(x, y + 1, result, newTrace);
		maze.recolor(x, y, NON_BACKGROUND);
    }

    // ADD METHOD FOR PROBLEM 3 HERE
    public ArrayList<PairInt> findMazePathMin(int x, int y) {
    	ArrayList <ArrayList<PairInt>> allPaths = findAllMazePaths(x, y);
    	int i = 0;
    	int minSize = allPaths.get(i).size();
    	// Goes through all paths comparing the sizes to determine whether or not there exists a smaller path
    	for(int j = 0; j < allPaths.size(); j++) {
    		if(minSize >= allPaths.get(j).size()) {
    			i = j;
    			minSize = allPaths.get(j).size();
    		}
    	}
    	ArrayList<PairInt> minPath = allPaths.get(i);
    	// If minPath empty, sets to have one element, (-1,-1) if no solution paths exist.
    	if(minPath.isEmpty()) {
    		minPath.add(new PairInt(-1, -1));
    	}
    	return minPath;
    }

    /*<exercise chapter="5" section="6" type="programming" number="2">*/
    public void resetTemp() {
        maze.recolor(TEMPORARY, BACKGROUND);
    }
    /*</exercise>*/

    /*<exercise chapter="5" section="6" type="programming" number="3">*/
    public void restore() {
        resetTemp();
        maze.recolor(PATH, BACKGROUND);
        maze.recolor(NON_BACKGROUND, BACKGROUND);
    }
    /*</exercise>*/
}
/*</listing>*/
