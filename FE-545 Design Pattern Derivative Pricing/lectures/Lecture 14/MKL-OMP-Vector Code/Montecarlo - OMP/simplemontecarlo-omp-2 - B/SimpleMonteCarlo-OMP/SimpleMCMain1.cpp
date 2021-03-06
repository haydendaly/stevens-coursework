//
//
//	          	SimpleMCMain1.cpp
//
//     
//       requires Random1.cpp

#include "Random1.h"
#include <iostream>
#include <cmath>
#include <ctime>
#include <omp.h>
using namespace std;

#define NUM_THREADS 48
#define BUFFER_SIZE 6
#define MAX_PATHS 10000000000 //Needs to be a multiple of BUFFER_SIZE

double SimpleMonteCarlo1(double Expiry,
	double Strike,
	double Spot,
	double Vol,
	double r,
	long NumberOfPaths)
{
	double variance = Vol*Vol*Expiry;
	double rootVariance = sqrt(variance);
	double itoCorrection = -0.5*variance;

	double movedSpot = Spot*exp(r*Expiry + itoCorrection);
	double thisSpot;
	double runningSum = 0;

	omp_set_num_threads(NUM_THREADS);
	#pragma omp parallel for reduction(+ : runningSum)
	for (long i = 0; i < NumberOfPaths / BUFFER_SIZE; i++)
	{
		double thisGaussian, thisPayoff, innerSum = 0;
		double buffer = 0;

		for (long j = 0; j < BUFFER_SIZE; j++)
		{
			thisGaussian = GetOneGaussianByBoxMuller();
			thisSpot = movedSpot*exp(rootVariance*thisGaussian);
			thisPayoff = thisSpot - Strike;
			thisPayoff = thisPayoff >0 ? thisPayoff : 0;
			innerSum += thisPayoff;
		}
		runningSum += innerSum;
	}
	double mean = runningSum / NumberOfPaths;
	mean *= exp(-r*Expiry);
	return mean;
}

int main()
{
	double Expiry = 30;
	double Strike = 125;
	double Spot = 120;
	double Vol = 0.10;
	double r = 0.05;
	long NumberOfPaths = MAX_PATHS;


	cout << "\nExpiry: " << Expiry << "\n";

	cout << "\nStrike: " << Strike << "\n";

	cout << "\nSpot: " << Spot << "\n";

	cout << "\nVolatility: " << Vol << "\n";

	cout << "\nRate of return: " << r << "\n";

	cout << "\nNumber of paths: " << NumberOfPaths << "\n";

	int start_s = clock();
	double result = SimpleMonteCarlo1(Expiry,
		Strike,
		Spot,
		Vol,
		r,
		NumberOfPaths);
	int stop_s = clock();

	cout << "\nThe price is " << result << "\n";

	cout << "\nTime: " << (stop_s - start_s) / double(CLOCKS_PER_SEC) << " seconds\n";

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
