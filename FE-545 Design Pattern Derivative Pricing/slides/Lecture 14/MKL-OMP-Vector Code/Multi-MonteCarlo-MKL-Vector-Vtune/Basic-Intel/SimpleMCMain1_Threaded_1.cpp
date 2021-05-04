//#include <omp.h>
//#include <mkl.h>
//
//#include <iostream>
//#include <cmath>
//#include <ctime>
//using namespace std;
//
//#define NUM_THREADS 24
////#define MAX_PATHS 1000000000
//#define MAX_PATHS 100000000
//
///* Array of all random numbers */
//#define ALIGNMENT_BYTES 64
//double* RN_ARRAY;
//unsigned int seed = 777;
//
//double SimpleMonteCarlo1(double Expiry,
//	double Strike,
//	double Spot,
//	double Vol,
//	double r,
//	unsigned long NumberOfPaths)
//{
//
//	double variance = Vol*Vol*Expiry;
//	double rootVariance = sqrt(variance);
//	double itoCorrection = -0.5*variance;
//
//	double movedSpot = Spot*exp(r*Expiry + itoCorrection);
//	double thisSpot;
//	double runningSum = 0;
//
//	RN_ARRAY = (double*)mkl_malloc(sizeof(double) * MAX_PATHS, ALIGNMENT_BYTES);
//	VSLStreamStatePtr stream; /* RNG stream state ptr */
//	vslNewStream(&stream, VSL_BRNG_NIEDERR, seed);
//	vdRngGaussian(VSL_RNG_METHOD_GAUSSIAN_ICDF, stream, MAX_PATHS, RN_ARRAY, 0, 1);
//
//	omp_set_num_threads(NUM_THREADS);
//	#pragma omp parallel for schedule(dynamic, 20000) reduction (+:runningSum)
//	//#pragma omp parallel for reduction(+ : runningSum)
//	//#pragma omp parallel for reduction(+ : runningSum) schedule(static, 20000)
//	//#pragma omp parallel for reduction(+ : runningSum) schedule(dynamic, 20000)
//	//#pragma omp parallel for reduction(+ : runningSum) schedule(auto)
//	//#pragma omp parallel for reduction(+ : runningSum) schedule(guided, 20000)
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
//	vslDeleteStream(&stream);
//	mkl_free(RN_ARRAY);
//	return mean;
//}
//
//int main()
//{
//
//	double Expiry = 30;
//	double Strike = 125;
//	double Spot = 120;
//	double Vol = 0.10;
//	double r = 0.05;
//	unsigned long NumberOfPaths = MAX_PATHS;
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