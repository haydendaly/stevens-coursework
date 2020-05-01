/*
 * SimpleMazeGame.java
 * Copyright (c) 2008, Drexel University.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Drexel University nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY DREXEL UNIVERSITY ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL DREXEL UNIVERSITY BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
package maze;

import java.util.*;
import java.io.*;

import maze.ui.MazeViewer;


/**
 * 
 * @author Sunny
 * @version 1.0
 * @since 1.0
 */
public class SimpleMazeGame
{
    
	public static void side(Direction direction, Room room, ArrayList<Room> rooms, ArrayList<Door> doors, String roomObject) {
		if (roomObject.contains("w")) {
			room.setSide(direction, new Wall());
		} else {
			Scanner scanner = (new Scanner(roomObject)).useDelimiter("[^0-9]+");
			int num = scanner.nextInt();
			if (roomObject.contains("d")) {
				room.setSide(direction, doors.get(num));
			} else {
				room.setSide(direction, rooms.get(num));
			}
			scanner.close();
		}
    }
    
	public static  Maze loadMaze(final String fileName) {
		Maze maze = new Maze();
		ArrayList<String> rows = new ArrayList<String>();
		try {
			BufferedReader reader = new BufferedReader(new FileReader(new File(fileName)));
			String row; 
			while ((row = reader.readLine()) != null) {
				rows.add(row);	
			} 
			reader.close();
		} catch (IOException e) {
			System.out.println("File error");
		}
		ArrayList<Room> rooms = new ArrayList<Room>();
		ArrayList<Door> doors = new ArrayList<Door>();
		for (int row = 0; row < rows.size(); row++) {
			String currentRow = rows.get(row);
			String[] rowList = currentRow.split(" ");
			if (rowList[0].equals("room")) {
				int num = Integer.parseInt(rowList[1]);
				Room newRoom = new Room(num);
				rooms.add(newRoom);
			} else if (rowList[0].equals("door")) {
				int room1 = Integer.parseInt(rowList[2]);
				int room2 = Integer.parseInt(rowList[3]);
				Door door = new Door(rooms.get(room1), rooms.get(room2));
				door.setOpen(rowList[4].equals("open"));
				doors.add(door);
			}
		}
		// Need to do loop again so can pass full rooms list to the side method
		for (int row = 0; row < rows.size(); row++) {
			String currentRow = rows.get(row);
            String[] roomList = currentRow.split(" ");
            if (roomList[0].equals("room")) {
                int roomNum = Integer.parseInt(roomList[1]);
                Room room = rooms.get(roomNum);
                side(Direction.North, room, rooms, doors, roomList[2]);
                side(Direction.South, room, rooms, doors, roomList[3]);
                side(Direction.East, room, rooms, doors, roomList[4]);
                side(Direction.West, room, rooms, doors, roomList[5]);
                maze.addRoom(room);
            }
		}
		maze.setCurrentRoom(0);
		System.out.println("Loaded maze from " + fileName);
		return maze;
    }
    
	public static void main(String[] args)
	{
        String fileName = "base.maze";
		if (args.length > 0) {
			fileName = args[0];
        }
	    MazeViewer viewer = new MazeViewer(loadMaze(fileName));
	    viewer.run();
	}
}