//
//
//                  NewtonRaphson.h
//
//

#include <cmath>
#include <iostream>

template<class T, double (T::*Value)(double) const, double (T::*Derivative)(double) const >
double NewtonRaphson(double Target,
                 double Start,
                 double Tolerance,
                 const T& TheObject)
{
    
    double y = (TheObject.*Value)(Start);
    double x=Start;
    unsigned int counter = 0, MAX_SIZE = 10;
    
    while ( fabs(y - Target) > Tolerance && counter < MAX_SIZE)
    {
        double d = (TheObject.*Derivative)(x);
         
        x+= (Target-y)/d;

        y = (TheObject.*Value)(x);
        counter++;

        std::cout << "Iteration " << counter << ": y = " << y << ", x = " << x << std::endl;
    }

    return x;
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

