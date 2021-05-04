package simulator;
public class Apartment {
    //Instance variables for Apartment
    private double quality;
    private int IDNum;
    private int yearsLeft;

    //Constructor for Apartment, to be completed by you
    public Apartment (double qual, int ID, int years) {
    	quality = qual;
    	IDNum = ID;
    	yearsLeft = years;
    }

    //Returns quality of apartment
    public double getQuality () {
        return quality;
    }

    //Returns ID number of apartment
    public int getIDNum () {
        return IDNum;
    }

    //Returns years left until apartment is vacant
    public int getYearsLeft () {
        return yearsLeft;
    }

    //Sets number of years until apartment is vacant
    public void setYearsLeft (int years) {
    	if (years <= 0) {
    		yearsLeft = years;
    	}
    }
}
