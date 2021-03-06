//#include <omp.h>
//#include <mkl.h>
//#include <iostream>
//
//using namespace std;
//
///* Parralelization Parameters */
//#define NUM_THREADS				24
//#define PARTIAL_ARRAY_SIZE		(1000000008/NUM_THREADS)
//#define FULL_SAMPLE_ARRAY_SIZE	(PARTIAL_ARRAY_SIZE*NUM_THREADS)
//#define NUMBER_OF_PATHS			(PARTIAL_ARRAY_SIZE*NUM_THREADS)
//#define ALIGNMENT_BYTES         64
//
//unsigned int seed = 777;
//
//
//
//
//__inline void SimpleMonteCarlo1(
//	double Expiry, 
//	double Strike, 
//	double Spot, 
//	double Vol, 
//	double r, 
//	int thr_id, 
//	double* FULL_SAMPLE_ARRAY)
//{
//	double variance = Vol*Vol*Expiry;
//	double rootVariance = sqrt(variance);
//	double itoCorrection = -0.5*variance;
//
//	double movedSpot = Spot*exp(r*Expiry + itoCorrection);
//	double thisSpot;
//
//	double* RN_ARRAY = &FULL_SAMPLE_ARRAY[PARTIAL_ARRAY_SIZE * thr_id];
//	VSLStreamStatePtr stream; /* RNG stream state ptr */
//	vslNewStream(&stream, VSL_BRNG_MT2203 + thr_id, seed);
//	vdRngGaussian(VSL_RNG_METHOD_GAUSSIAN_BOXMULLER2, stream, PARTIAL_ARRAY_SIZE, RN_ARRAY, 0, 1);
//
//	//#pragma omp parallel for
//	#pragma omp simd
//	for (long i = 0; i < PARTIAL_ARRAY_SIZE; i++)
//	{
//		thisSpot = movedSpot*exp(rootVariance*RN_ARRAY[i]);
//		double thisPayoff = thisSpot - Strike;
//		RN_ARRAY[i] = thisPayoff >0 ? thisPayoff : 0;
//	}
//
//	vslDeleteStream(&stream);
//	return;
//}
//
//int main()
//{
//	/* Generation of all lottery results, with time measuring (without warm-up) */
//	double t;
//	t = dsecnd(); /* Extra call to dsecnd for its initialization */
//	t = dsecnd(); /* Get elapsed time in seconds. */
//
//	double Expiry = 30;
//	double Strike = 125;
//	double Spot = 120;
//	double Vol = 0.10;
//	double r = 0.05;
//
//	cout << "\nExpiry: " << Expiry << "\n";
//	cout << "\nStrike: " << Strike << "\n";
//	cout << "\nSpot: " << Spot << "\n";
//	cout << "\nVolatility: " << Vol << "\n";
//	cout << "\nRate of return: " << r << "\n";
//	cout << "\nNumber of paths: " << NUMBER_OF_PATHS << "\n";
//
//	/* Allocate memory for full samples */
//	double* FULL_SAMPLE_ARRAY;
//	if (!(FULL_SAMPLE_ARRAY = (double*)mkl_malloc(sizeof(double) * FULL_SAMPLE_ARRAY_SIZE, ALIGNMENT_BYTES))) {
//		cout << "Error 1: Memory allocation failed!\n";
//		exit(1);
//	}
//
//	/* Parallelization of calls to SimpleMontecarlo1 */
//	omp_set_num_threads(NUM_THREADS);
//	#pragma omp parallel 
//	{
//		int thr_id = omp_get_thread_num(); /* thr is thread index or thread id */
//		SimpleMonteCarlo1(
//			Expiry, 
//			Strike, 
//			Spot, 
//			Vol, 
//			r, 
//			thr_id, 
//			FULL_SAMPLE_ARRAY);
//	}
//
//	double runningSum = 0.0;
//	#pragma omp parallel for reduction(+ : runningSum)
//	for (unsigned long i = 0; i < FULL_SAMPLE_ARRAY_SIZE; i++)
//	{
//		runningSum += FULL_SAMPLE_ARRAY[i];
//	}
//	double result = runningSum / FULL_SAMPLE_ARRAY_SIZE;
//	result *= exp(-r*Expiry);
//
//	MKL_free(FULL_SAMPLE_ARRAY);
//
//	t = dsecnd() - t; /* Time spent, measured in seconds */
//	cout << "\nThe price is " << result << "\n";
//	cout << "\nTime: " << t << " seconds\n\n";
//	
//	return 0;
//}