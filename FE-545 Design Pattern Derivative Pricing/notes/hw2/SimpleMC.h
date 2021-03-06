//
//  SimpleMC.h
//  notes
//
//  Created by Hayden Daly on 1/31/21.
//

#ifndef SIMPLE_MC_H
#define SIMPLE_MC_H
#include "PayOff2.h"

double SimpleMonteCarlo2(const PayOff& thePayOff,
                         double Expiry,
                         double Spot,
                         double Vol,
                         double r,
                         unsigned long NumberOfPaths);

#endif
