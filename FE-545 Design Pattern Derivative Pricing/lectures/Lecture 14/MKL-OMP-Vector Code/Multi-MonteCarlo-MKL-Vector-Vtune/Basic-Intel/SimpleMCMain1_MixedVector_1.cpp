//#include <omp.h>
//#include <mkl.h>
//#include <iostream>
//
//using namespace std;
//
///* Parralelization Parameters */
//#define NUM_THREADS				1
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
//	/* Get random numbers on RN_ARRAY */
//	double* RN_ARRAY = &FULL_SAMPLE_ARRAY[PARTIAL_ARRAY_SIZE * thr_id];
//	VSLStreamStatePtr stream; /* RNG stream state ptr */
//	vslNewStream(&stream, VSL_BRNG_MT2203 + thr_id, seed);
//	vdRngGaussian(VSL_RNG_METHOD_GAUSSIAN_BOXMULLER2, stream, PARTIAL_ARRAY_SIZE, RN_ARRAY, 0, 1);
//
//	/* Do vectorized: movedSpot*exp(rootVariance*thisGaussian) */
//	cblas_dscal(PARTIAL_ARRAY_SIZE, rootVariance, RN_ARRAY, 1);
//	vmdExp(PARTIAL_ARRAY_SIZE, RN_ARRAY, RN_ARRAY, VML_HA);
//	cblas_dscal(PARTIAL_ARRAY_SIZE, movedSpot, RN_ARRAY, 1);
//
//	/* Do vectorized: thisSpot - Strike */
//	cblas_daxpy(PARTIAL_ARRAY_SIZE, -1.0, &Strike, 0, RN_ARRAY, 1);
//
//	/* Do vectorized: thisPayoff >0 ? thisPayoff : 0 */
//	/* First: create vector of Zeroes                */
//	double* ZEROES_ARRAY;
//	if (!(ZEROES_ARRAY = (double*)mkl_calloc(PARTIAL_ARRAY_SIZE, sizeof(double), ALIGNMENT_BYTES))) {
//		cout << "Error 2: Memory allocation failed!\n";
//		exit(2);
//	}
//	vdFmax(PARTIAL_ARRAY_SIZE, ZEROES_ARRAY, RN_ARRAY, RN_ARRAY);
//
//	/* Release memory and return */
//	mkl_free(ZEROES_ARRAY);
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
//#pragma omp parallel for reduction(+ : runningSum)
//	for (unsigned long i = 0; i < FULL_SAMPLE_ARRAY_SIZE; i++)
//	{
//		runningSum += FULL_SAMPLE_ARRAY[i];
//	}
//	double result = runningSum / FULL_SAMPLE_ARRAY_SIZE;
//	result *= exp(-r*Expiry);
//
//	mkl_free(FULL_SAMPLE_ARRAY);
//
//	t = dsecnd() - t; /* Time spent, measured in seconds */
//	cout << "\nThe price is " << result << "\n";
//	cout << "\nTime: " << t << " seconds\n\n";
//
//	return 0;
//}