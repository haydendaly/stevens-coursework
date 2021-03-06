//
//  SimpleMCMain3.cpp
//  notes
//
//  Created by Hayden Daly on 1/31/21.
//

#include "SimpleMC3.h"
#include "SimpleMC.h"
#include "PayOff2.h"
#include <iostream>

using namespace std;

void SimpleMCMain3()
{
    double Expiry = 1;
    double Spot = 60;
    double Vol = 1;
    double r = .05;
    double Lower = 55;
    double Upper = 65;
    unsigned long NumberOfPaths = 10000;
    
    PayOffDD ddPayOff(Lower, Upper);
    
    double resultDd = SimpleMonteCarlo2(ddPayOff,
                                       Expiry,
                                       Spot,
                                       Vol,
                                       r,
                                       NumberOfPaths);
    
    cout << "\nThe price of the double digital is " << resultDd << "\n";
    return;
}
