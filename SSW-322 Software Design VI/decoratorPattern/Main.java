import java.util.*;
public class Main {

    public static Beverage addIngredient(Beverage beverage, String ingredient) {
        if (ingredient.equals("chocolate")) {
            return new Chocolate(beverage);
        } else if (ingredient.equals("milk")) {
            return new Milk(beverage);
        } else if (ingredient.equals("whipcream")) {
            return new WhipCream(beverage);
        } else {
            return beverage;
        }
    }

    public static void main(String[] instruction) {
        Map<String, Beverage> drinks = new HashMap<String, Beverage>();
        drinks.put("espresso", new Espresso());
        drinks.put("decaf", new Decaf());
        drinks.put("houseblend", new HouseBlend());
        drinks.put("mocha", new Chocolate(new Espresso()));
        drinks.put("latte", new Milk(new Espresso()));
        drinks.put("cappuccino", new WhipCream(new Espresso()));
        drinks.put("decafmocha", new Chocolate(new Decaf()));
        drinks.put("decaflatte", new Milk(new Decaf()));
        drinks.put("decafcappuccino", new WhipCream(new Decaf()));
        drinks.put("greentea", new GreenTea());
        drinks.put("redtea", new RedTea());
        drinks.put("whitetea", new WhiteTea());
        drinks.put("flowertea", new Jasmine(new WhiteTea()));
        drinks.put("gingertea", new Ginger(new GreenTea()));
        drinks.put("tealatte", new Milk(new RedTea()));
        Beverage beverage = drinks.get(instruction[0].toLowerCase());
        for(int i = 1; i < instruction.length; i++) {
            beverage = addIngredient(beverage, instruction[i].toLowerCase());
        }
        System.out.println("The total cost of your order is: $" + Math.round(beverage.cost()*10)/10.0);
        System.out.println("The beverage is prepared as follows: \n" + beverage.getDescription());
    }
}