//
//
//              SolveMain2.cpp
//
//
/*
Needs
    BlackScholesFormulas.cpp
    BSCallTwo.cpp
    Normals.cpp
*/
#include "NewtonRaphson.h"
#include <cmath>
#include <iostream>
#include "BSCallTwo.h"
#include "BlackScholesFormulas.h"

using namespace std;

int main()
{
    double Expiry = 50;
    double Strike = 120;
    double Spot = 100;
    double r = .1;
    double d = 0;
    double Price = 100;
    double start = 0.5;
    double tolerance = 0;
//
//    cout << "\nEnter expiry\n";
//    cin >> Expiry;
//
//    cout << "\nStrike\n";
//    cin >> Strike;
//
//    cout << "\nEnter spot\n";
//    cin >> Spot;
//
//    cout << "\nEnter price\n";
//    cin >> Price;
//
//    cout << "\nr\n";
//    cin >> r;
//
//    cout << "\nd\n";
//    cin >> d;
//
//    double start;
//
//    cout << "\nstart guess\n";
//    cin >> start;
//
//    double tolerance;
//
//    cout << "\nTolerance\n";
//    cin >> tolerance;

    BSCallTwo theCall(r,d,Expiry,Spot,Strike);

    double vol=NewtonRaphson<BSCallTwo, &BSCallTwo::Price, &BSCallTwo::Vega>(Price,
                                                                           start,
                                                                           tolerance,
                                                                           theCall);

    double PriceTwo = BlackScholesCall(Spot,Strike,r,d,vol,Expiry);

    cout << "\n vol " << vol << " \nprice two:" << PriceTwo << "\n";

    double tmp;
    cin >> tmp;

    return 0;
}

/*
 *
 * Copyright (c) 2002
 * Mark Joshi
 *
 * Permission to use, copy, modify, distribute and sell this
 * software for any purpose is hereby
 * granted without fee, provided that the above copyright notice
 * appear in all copies and that both that copyright notice and
 * this permission notice appear in supporting documentation.
 * Mark Joshi makes no representations about the
 * suitability of this software for any purpose. It is provided
 * "as is" without express or implied warranty.
*/

