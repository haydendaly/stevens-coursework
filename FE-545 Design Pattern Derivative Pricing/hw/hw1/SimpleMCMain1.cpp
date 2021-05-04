//
//
//                  SimpleMCMain1.cpp
//
//
//       requires Random1.cpp

#include "Random1.h"
#include <iostream>
#include <cmath>
using namespace std;

double SimpleMonteCarloCall(double Expiry,
                         double Strike,
                         double Spot,
                         double Vol,
                         double r,
                         unsigned long NumberOfPaths)
{
    double variance = Vol*Vol*Expiry;
    double rootVariance = sqrt(variance);
    double itoCorrection = -0.5*variance;

    double movedSpot = Spot*exp(r*Expiry +itoCorrection);
    double thisSpot;
    double runningSum=0;

    for (unsigned long i=0; i < NumberOfPaths; i++)
    {
        double thisGaussian = GetOneGaussianByBoxMuller();
        thisSpot = movedSpot*exp( rootVariance*thisGaussian);
        double thisPayoff = thisSpot - Strike;
        thisPayoff = thisPayoff > 0 ? thisPayoff : 0;
        runningSum += thisPayoff;
    }

    double mean = runningSum / NumberOfPaths;
    mean *= exp(-r*Expiry);
    return mean;
}

double SimpleMonteCarloPut(double Expiry,
                            double Strike,
                            double Spot,
                            double Vol,
                            double r,
                            unsigned long NumberOfPaths)
{
    double variance = Vol*Vol*Expiry;
    double rootVariance = sqrt(variance);
    double itoCorrection = -0.5*variance;

    double movedSpot = Spot*exp(r*Expiry +itoCorrection);
    double thisSpot;
    double runningSum=0;

    for (unsigned long i=0; i < NumberOfPaths; i++)
    {
        double thisGaussian = GetOneGaussianByBoxMuller();
        thisSpot = movedSpot*exp( rootVariance*thisGaussian);
        double thisPayoff = Strike - thisSpot;
        thisPayoff = thisPayoff > 0 ? thisPayoff : 0;
        runningSum += thisPayoff;
    }

    double mean = runningSum / NumberOfPaths;
    mean *= exp(-r*Expiry);
    return mean;
}

double SimpleMonteCarloDD(double Expiry,
                            double Lower,
                            double Upper,
                            double Spot,
                            double Vol,
                            double r,
                            unsigned long NumberOfPaths)
{
    double variance = Vol*Vol*Expiry;
    double rootVariance = sqrt(variance);
    double itoCorrection = -0.5*variance;

    double movedSpot = Spot*exp(r*Expiry +itoCorrection);
    double thisSpot;
    double runningSum=0;

    for (unsigned long i=0; i < NumberOfPaths; i++)
    {
        double thisGaussian = GetOneGaussianByBoxMuller();
        thisSpot = movedSpot*exp(rootVariance * thisGaussian);
        double thisPayoff = thisSpot <= Lower || thisSpot >= Upper ? 0 : 1;
        runningSum += thisPayoff;
    }

    double mean = runningSum / NumberOfPaths;
    mean *= exp(-r*Expiry);
    return mean;
}

int main()
{
    double Expiry = 1;
    double Strike = 54;
    double Spot = 60;
    double Vol = .2;
    double r = .05;
    double Lower = 55;
    double Upper = 65;
    unsigned long NumberOfPaths = 10000;

    double resultCall = SimpleMonteCarloCall(Expiry,
                                      Strike,
                                      Spot,
                                      Vol,
                                      r,
                                      NumberOfPaths);
    
    double resultPut = SimpleMonteCarloPut(Expiry,
                                      Strike,
                                      Spot,
                                      Vol,
                                      r,
                                      NumberOfPaths);
    
    double resultDd = SimpleMonteCarloDD(Expiry,
                                         Lower,
                                         Upper,
                                         Spot,
                                         Vol,
                                         r,
                                         NumberOfPaths);

    cout << "Call: " << resultCall << "\n"
            "Put: " << resultPut << "\n"
            "DD: " << resultDd << "\n";
    
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

