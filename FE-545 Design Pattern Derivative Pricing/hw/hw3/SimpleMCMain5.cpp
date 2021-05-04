//
//
//        SimpleMCMain5.cpp
//
//
/*
requires DoubleDigital.cpp
         PayOff2.cpp
         Random1.cpp
         SimpleMC2.cpp
*/
#include "PayOff2.h"
#include "SimpleMC2.h"
#include <iostream>

using namespace std;

int main()
{

    double Expiry = 1;
    double Spot = 30;
    double Vol = .1;
    double r = .05;
    unsigned long NumberOfPaths = 1000;
    double Strike = 20;
    double n = 3;
    
    PayOffPOPut thePayOffPOPut(Strike, n);
    PayOffPOCall thePayOffPOCall(Strike, n);

    double resultPut = SimpleMonteCarlo2(thePayOffPOPut,
                                      Expiry,
                                      Spot,
                                      Vol,
                                      r,
                                      NumberOfPaths);
    
    double resultCall = SimpleMonteCarlo2(thePayOffPOCall,
                                      Expiry,
                                      Spot,
                                      Vol,
                                      r,
                                      NumberOfPaths);
    
    cout << "\nThe prices are:\n\nPut:    $" << resultPut << "\nCall:   $" << resultCall << "\n\n";

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

