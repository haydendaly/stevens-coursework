# A simple Monte Carlo model

## Limitations

Good model but limited in code reusability. Needs to be more modular to meet demands (i.e. add convergance table, display standard error, add geometric average for Asian option).

## Improvement

Simplest is to create a new function or two add an extra param like an `enum` to compute the payoff via a `switch` statement.

With C, you could pass a function pointer but C++ would allow for classes.

### Class-based Approach

C++ object for the pay-off. Differing features require classes for different parts of the model so could generalize into class to model the `termination` step of the equation.

Different random generation models, potentially a `generator` class for random numbers beyond Box-Muller.

## Key Points

- Monte Carlo uses Law of Large Numbers to approximate this risk-netural expectation
- Reuse is social and technical
- Procedural is efficient but makes reuse difficult
- Classes allow for encapsulation of concepts making reuse and extensibility easier
