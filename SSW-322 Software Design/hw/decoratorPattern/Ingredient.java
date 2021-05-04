public abstract class Ingredient implements Beverage {
    public Beverage beverage;
    public Ingredient(Beverage beverage) { this.beverage = beverage; }
    // named cost1 so methods don't conflict
    abstract float cost1();
    public String getDescription() { return beverage.getDescription() + " " + getClass().getName(); }
    public float cost() { return beverage.cost() + cost1(); }
}