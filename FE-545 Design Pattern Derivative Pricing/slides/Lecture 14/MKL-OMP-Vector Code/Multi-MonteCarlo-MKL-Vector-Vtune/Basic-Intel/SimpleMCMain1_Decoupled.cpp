//#include <Random1.h>
//#include <iostream>
//#include <cmath>
//#include <ctime>
//using namespace std;
//
//#define MAX_PATHS 1000000
////#define MAX_PATHS 1000000000
//
//double SimpleMonteCarlo1(double Expiry,
//	double Strike,
//	double Spot,
//	double Vol,
//	double r,
//	unsigned long NumberOfPaths)
//{
//	double variance = Vol*Vol*Expiry;
//	double rootVariance = sqrt(variance);
//	double itoCorrection = -0.5*variance;
//
//	double movedSpot = Spot*exp(r*Expiry + itoCorrection);
//	double thisSpot;
//	double runningSum = 0;
//
//	//double* RN_ARRAY = new double[MAX_PATHS];
//	double* RN_ARRAY = (double*)malloc(sizeof(double) * MAX_PATHS);
//
//	for (unsigned long i = 0; i < NumberOfPaths; i++)
//	{
//	RN_ARRAY[i] = GetOneGaussianByBoxMuller();
//	}
//
//	for (unsigned long i = 0; i < NumberOfPaths; i++)
//	{
//		double thisGaussian = RN_ARRAY[i];
//		thisSpot = movedSpot*exp(rootVariance*thisGaussian);
//		double thisPayoff = thisSpot - Strike;
//		thisPayoff = thisPayoff >0 ? thisPayoff : 0;
//		runningSum += thisPayoff;
//	}
//
//	double mean = runningSum / NumberOfPaths;
//	mean *= exp(-r*Expiry);
//
//	free(RN_ARRAY);
//	return mean;
//}
//
//int main()
//{
//	double Expiry = 30;
//	double Strike = 125;
//	double Spot = 120;
//	double Vol = 0.10;
//	double r = 0.05;
//	unsigned long NumberOfPaths = MAX_PATHS;
//
//
//	cout << "\nExpiry: " << Expiry << "\n";
//	cout << "\nStrike: " << Strike << "\n";
//	cout << "\nSpot: " << Spot << "\n";
//	cout << "\nVolatility: " << Vol << "\n";
//	cout << "\nRate of return: " << r << "\n";
//	cout << "\nNumber of paths: " << NumberOfPaths << "\n";
//
//	int start_s = clock();
//	double result = SimpleMonteCarlo1(Expiry,
//		Strike,
//		Spot,
//		Vol,
//		r,
//		NumberOfPaths);
//
//	int stop_s = clock();
//	cout << "\nThe price is " << result << "\n";
//	cout << "\nTime: " << (stop_s - start_s) / double(CLOCKS_PER_SEC) << " seconds\n\n";
//	return 0;
//}