# Encapsulation

## PayOff Class

### PayOff Header

The constructor

```cpp
PayOff(double Strike_, OptionType TheOptionsType_)
```

Takes in the strike of the option and the type of option payoff

Main method of the class is 

```cpp
double PayOff::operator()(double spot) const
```

`operator` is overloaded so you can call it directly on the instantiation of the `PayOff` class (i.e. `thePayOff(s)`). This is called a functor or function object in C++. It has `const` to not specify that it does not modify the state of the object. Needs to be `const` because the `operator` class of an Object is by default a `const` method and without would throw "cannot call non `const` methods of `const` objects".

#### Usage of `const`

Some programmers try to never use `const` following the logic "if we use `const` in some places, we must use it everywhere, and all it does is cause trouble and stop me doing what I want so why bother? Life will be much easier if we just do not use it."

Should use it when possible because it as a safety enforcement mechanism. Forces consideration of object context. Picks up errors at compile instead of runtime.

Giving compiler extra information on which allows it to make extra optimizations.

### PayOff Class

Data is private meaning it can't be accessed outside of the class.

Class is a contract between the coder and user. We provide the user with an interface that allows him to provide spot and return pay-off. Strike should be private as it isn't part of the desired output and is beyond the contract.

Input a `PayOff` object instead of a strike as this is included in the class.

## Open-Closed Principle

Open means code should always be open for extension.

Closed means that a file is closed for modification and the programmer should be able to do the extension without modifying any existing files.
