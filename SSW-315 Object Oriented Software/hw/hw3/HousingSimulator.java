package simulator;
import java.util.Scanner;

public class HousingSimulator {
    //Functions for generating random double
    public static double randomDouble(int from, int to) {
        return Math.random() * to + from;
    }

    //Functions for generating random int
    public static int randomInt(int from, int to) {
        return (int) Math.random() * to + from;
    }

	//To be completed by you
    public static void runSimulation(int k, int N) {
    	int year = 0;
    	int studentCount = 0;
        MyQueue<Student> students = new MyQueue<Student>();
        MyQueue<Apartment> apartments = new MyQueue<Apartment>();

        for(int i = 0; i < k; i++) {
            students.offer(new Student(randomDouble(0, 1), studentCount));
            studentCount++;
        }

        for(int i = 0; i < N; i++) {
            apartments.offer(new Apartment(randomDouble(0, 1), i, 0));
        }

        while(true) {
            int apartmentsEmpty = 0;
            int apartmentsOccupied = 0;
            int size = apartments.size();

            for(int i = 0; i < size; i++) {
                System.out.println(i);
                Apartment temp = apartments.get(i);
                double tempQuality = temp.getQuality();

                if(k < 10) {
                    System.out.println("current apartment " + temp.getIDNum() + " has " + temp.getYearsLeft() + " years remaining");
                }
                if(temp.getYearsLeft() == 0) {
                	Student tempStudent = students.poll();
                    while(tempStudent != null) {
                        System.out.println("current student " + tempStudent.getIDNum());
                        if(tempQuality > tempStudent.getQualityThreshold()) {
                            if(k < 10) {
                                System.out.println("occupying apartment " + temp.getIDNum() + " with student " + tempStudent.getIDNum());
                            }
                            temp.setYearsLeft(randomInt(1, 5));
                            apartmentsOccupied++;
                        } else {
                            tempStudent.addDesperation();
                            if(k < 10) {
                                System.out.println("student " + tempStudent.getIDNum() + " is getting more desperate " + tempStudent.getQualityThreshold());
                            }
                            students.offer(tempStudent);
                        }
                        tempStudent = students.poll();
                    }
                }
            }


            for(int i = 0; i < size; i++) {
                System.out.println(i);
                Apartment thisApartment = apartments.get(i);
                thisApartment.setYearsLeft(thisApartment.getYearsLeft() - 1);
                if(thisApartment.getYearsLeft() == 0) {
                    apartmentsEmpty++;
                }
            }
            year++;
            System.out.println("year " + year + "\n emptied " + apartmentsEmpty + "\n occupied: " + apartmentsOccupied);
            for(int i = 0; i < k; i++) {
                students.offer(new Student(randomDouble(0, 1), studentCount));
                studentCount++;
            }
        }
    }

    //Main method for simulation
    public static void main (String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter number of students to run simulation with: ");
        int k = sc.nextInt();

        System.out.print("Enter number of apartments to run simulation with: ");
        int N = sc.nextInt();
        runSimulation(k, N);
    }
}
