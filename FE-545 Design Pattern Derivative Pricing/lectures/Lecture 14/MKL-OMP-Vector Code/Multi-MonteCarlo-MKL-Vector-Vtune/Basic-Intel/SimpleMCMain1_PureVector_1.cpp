//#include <mkl.h>
//#include <iostream>
//
//using namespace std;
//
//#define TBB_USE_THREADING_TOOLS	1
//
///* Parralelization Parameters */
//#define NUM_THREADS				24
//#define FULL_SAMPLE_ARRAY_SIZE	1000000000
//#define NUMBER_OF_PATHS			FULL_SAMPLE_ARRAY_SIZE
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
//	double* RN_ARRAY = FULL_SAMPLE_ARRAY;
//	VSLStreamStatePtr stream; /* RNG stream state ptr */
//	vslNewStream(&stream, VSL_BRNG_MT2203, seed);
//	vdRngGaussian(VSL_RNG_METHOD_GAUSSIAN_BOXMULLER2, stream, FULL_SAMPLE_ARRAY_SIZE, RN_ARRAY, 0, 1);
//
//	/* Do vectorized: movedSpot*exp(rootVariance*thisGaussian) */
//	cblas_dscal(FULL_SAMPLE_ARRAY_SIZE, rootVariance, RN_ARRAY, 1);
//	vdExp(FULL_SAMPLE_ARRAY_SIZE, RN_ARRAY, RN_ARRAY);
//	cblas_dscal(FULL_SAMPLE_ARRAY_SIZE, movedSpot, RN_ARRAY, 1);
//	
//	/* Do vectorized: thisSpot - Strike */
//	cblas_daxpy(FULL_SAMPLE_ARRAY_SIZE, -1.0, &Strike, 0, RN_ARRAY, 1);
//	
//	/* Do vectorized: thisPayoff >0 ? thisPayoff : 0 */
//	/* First: create vector of Zeroes                */
//	double* ZEROES_ARRAY;
//	if (!(ZEROES_ARRAY = (double*)mkl_calloc(FULL_SAMPLE_ARRAY_SIZE, sizeof(double), ALIGNMENT_BYTES))) {
//		cout << "Error 2: Memory allocation failed!\n";
//		exit(2);
//	}
//	vdFmax(FULL_SAMPLE_ARRAY_SIZE, ZEROES_ARRAY, RN_ARRAY, RN_ARRAY);
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
//	/* Sets computation mode for vector functions             */
//	/* VML_HA = high accuracy versions of VM functions        */
//	/* VML_LA = low accuracy versions of VM functions         */
//	/* VML_EP = enhanced performance accuracy of VM functions */
//	mkl_set_num_threads(NUM_THREADS);
//	vmlSetMode(VML_HA);
//
//	/* Allocate memory for full samples */
//	double* FULL_SAMPLE_ARRAY;
//	if (!(FULL_SAMPLE_ARRAY = (double*)mkl_malloc(sizeof(double) * FULL_SAMPLE_ARRAY_SIZE, ALIGNMENT_BYTES))) {
//		cout << "Error 1: Memory allocation failed!\n";
//		exit(1);
//	}
//
//	SimpleMonteCarlo1(
//		Expiry,
//		Strike, 
//		Spot, 
//		Vol, 
//		r, 
//		FULL_SAMPLE_ARRAY);
//	
//	/* Vectorized mean: Vector summary stats */
//	/* There are different methods for computation */
//	/* VSL_SS_METHOD_FAST: Fast method for calculation of the estimates */
//	/* VSL_SS_METHOD_1PASS: One-pass method for calculation of estimates */
//	double result = 0.0;
//	int p = 1;
//	int dim = FULL_SAMPLE_ARRAY_SIZE;
//	int xstorage = VSL_SS_MATRIX_STORAGE_ROWS;
//	VSLSSTaskPtr task;
//	vsldSSNewTask(&task, &p, &dim, &xstorage, FULL_SAMPLE_ARRAY, NULL, NULL);
//	vsldSSEditTask(task, VSL_SS_ED_MEAN, &result);
//	vsldSSCompute(task, VSL_SS_MEAN, VSL_SS_METHOD_FAST);
//	vslSSDeleteTask(&task);
//
//	result *= exp(-r*Expiry);
//
//	/* Release memory: Important!!! */ 
//	mkl_free(FULL_SAMPLE_ARRAY);
//
//	t = dsecnd() - t; /* Time spent, measured in seconds */
//	cout << "\nThe price is " << result << "\n";
//	cout << "\nTime: " << t << " seconds\n\n";
//	
//	return 0;
//}