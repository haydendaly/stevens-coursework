/*
*******************************************************************************
* Copyright(C) 2014-2015 Intel Corporation. All Rights Reserved.
*
* The source code, information  and  material ("Material") contained herein is
* owned  by Intel Corporation or its suppliers or licensors, and title to such
* Material remains  with Intel Corporation  or its suppliers or licensors. The
* Material  contains proprietary information  of  Intel or  its  suppliers and
* licensors. The  Material is protected by worldwide copyright laws and treaty
* provisions. No  part  of  the  Material  may  be  used,  copied, reproduced,
* modified, published, uploaded, posted, transmitted, distributed or disclosed
* in any way  without Intel's  prior  express written  permission. No  license
* under  any patent, copyright  or  other intellectual property rights  in the
* Material  is  granted  to  or  conferred  upon  you,  either  expressly,  by
* implication, inducement,  estoppel or  otherwise.  Any  license  under  such
* intellectual  property  rights must  be express  and  approved  by  Intel in
* writing.
* 
* *Third Party trademarks are the property of their respective owners.
* 
* Unless otherwise  agreed  by Intel  in writing, you may not remove  or alter
* this  notice or  any other notice embedded  in Materials by Intel or Intel's
* suppliers or licensors in any way.
*
********************************************************************************
*   Content : Multiple Simple Random Sampling without Replacement
*
********************************************************************************
*/

#include <omp.h>
#include <mkl.h>
#include <stdio.h>


/* Lottery parameters */
#define M 6                     /* lottery first parameter */
#define N 49                    /* lottery second parameter */
//#define EXPERIM_NUM 11969664    /* number of lottery experiments */
#define EXPERIM_NUM 300000000    /* number of lottery experiments */


/* Array of results from all experiments */
#define ALIGNMENT_BYTES         64
#define RESULTS_ARRAY_SIZE      (EXPERIM_NUM*M)
unsigned int* RESULTS_ARRAY;



#define RNGBUFSIZE (225*M)

/* The function Next_Uniform_Int returns next random integer uniformly distributed on the needed interval */
__inline unsigned int Next_Uniform_Int(VSLStreamStatePtr stream, double* D_UNIFORM01_BUF, unsigned int *D_UNIFORM01_IDX) { /* Return integer uniformly distributed on {0,...,m-1}. */
    #define I_RNG_BUF   ((unsigned int*)D_UNIFORM01_BUF)
    unsigned int i,j,k;
    if( (*D_UNIFORM01_IDX)==0 ) {
        /* Here if this is the first call to Next_Uniform_Int */
        /* or if D_UNIFORM01_BUF has been completely used */

        /* Generate double-precision uniforms from [0;1) */
        vdRngUniform( VSL_RNG_METHOD_UNIFORM_STD, stream, RNGBUFSIZE, D_UNIFORM01_BUF, 0.0, 1.0 );

        /* Integer scaling phase */
        #pragma omp simd
        for( i=0; i<RNGBUFSIZE/M; i++ )
            for( k=0; k<M; k++ )
                I_RNG_BUF[i*M+k] =
                    k + (unsigned int)(D_UNIFORM01_BUF[i*M+k] * (double)(N-k));
    }

    /* Return next integer from buffer */
    j = I_RNG_BUF[*D_UNIFORM01_IDX];
    (*D_UNIFORM01_IDX) = (*D_UNIFORM01_IDX) + 1;

    /* Check if buffer has been completely used */
    if( (*D_UNIFORM01_IDX)==RNGBUFSIZE )
        (*D_UNIFORM01_IDX)=0;

    return j;
}

/* Fisher-Yates shuffle */
__inline void Fisher_Yates_shuffle(VSLStreamStatePtr stream, double* D_UNIFORM01_BUF, unsigned int *D_UNIFORM01_IDX, unsigned int* PERMUT_BUF) {
    unsigned int i,j;
    unsigned int tmp;

    #pragma novector /* Vectorization is useless here */
    /* A2.2: for i from 0 to M-1 do */
    for( i=0; i<M; i++ ) {

        /* A2.3: generate random natural number X from {i,...,N-1} */
        j = Next_Uniform_Int(stream,D_UNIFORM01_BUF, D_UNIFORM01_IDX); /* Uniform integer from {i,...,N-1} */

        /* A2.4: interchange PERMUT_BUF[i] and PERMUT_BUF[X] */
        tmp = PERMUT_BUF[i];
        PERMUT_BUF[i] = PERMUT_BUF[j];
        PERMUT_BUF[j] = tmp;
    }
}

int main(void) {
    unsigned int i;
    unsigned int sample_num;
    double t;

    /* Allocate memory for results buffer */
    if( !(RESULTS_ARRAY=(unsigned int*)mkl_malloc( sizeof(unsigned int) * RESULTS_ARRAY_SIZE, ALIGNMENT_BYTES )) ) {
        printf("Error 1: Memory allocation failed!\n");
        exit(1);
    }


    /* Generation of all lottery results, with time measuring (without warm-up) */
    t = dsecnd(); /* Extra call to dsecnd for its initialization. */
    t = dsecnd(); /* Get elapsed time in seconds. */
    #pragma omp parallel
    {
        unsigned int i;
        unsigned int sample_num;
        unsigned int THREADS_NUM;
        unsigned int ONE_THR_PORTION_SIZE;
        int          thr;
        unsigned int seed;
        VSLStreamStatePtr stream; /* Each thread has its own RNG stream */
        unsigned int* PERMUT_BUF; /* Each thread has its own buffer of length N to keep partial permutations */
        double* D_UNIFORM01_BUF; /* Each thread has its own buffer of intermediate uniforms */
        unsigned int D_UNIFORM01_IDX=0; /* Index of current uniform in the buffer (each thread has its own index) */

        thr = omp_get_thread_num(); /* thr is thread index or thread id */
        THREADS_NUM = omp_get_num_threads(); /* number of OpenMP threads in this parallel region */
        seed = 777;
        ONE_THR_PORTION_SIZE = (RESULTS_ARRAY_SIZE/THREADS_NUM);

        /* Allocate memory for population buffer */
        if( !(PERMUT_BUF=(unsigned int*)mkl_malloc( sizeof(unsigned int)*N, ALIGNMENT_BYTES )) ) {
            printf("Error 2: Memory allocation failed in thread %d!\n", thr);
        } else {

            /* Allocate memory for intermediate uniforms */
            if( !(D_UNIFORM01_BUF=(double*)mkl_malloc( sizeof(double)*RNGBUFSIZE, ALIGNMENT_BYTES )) ) {
                printf("Error 3: Memory allocation failed in thread %d!\n", thr);

            } else {

                /* RNG stream initialization in this thread, */
                /* each thread will produce RNG sequence independent of other threads sequencies, */
                /* inspite of same seed used */
                if( (vslNewStream( &stream, VSL_BRNG_MT2203+thr, seed ))!=VSL_STATUS_OK ) {
                    printf("Error 4: Stream initialization failed in thread %d!\n", thr);
                } else {

                    /*  A2.1: (Initialization step) let PERMUT_BUF contain natural numbers 1, 2, ..., N */
                    #pragma omp simd
                    for( i=0; i<N; i++ ) PERMUT_BUF[i]=i+1; /* we will use the set {1,...,N} */


                    /* Generation of experiment samples (in thread number thr). */
                    /*  The RESULTS_ARRAY is broken down into THREADS_NUM portions of size ONE_THR_PORTION_SIZE, */
                    /*  and each thread generates results for its portion of RESULTS_ARRAY. */
                    #pragma novector /* No sense in vectorization */
                    for( sample_num=0; sample_num<EXPERIM_NUM/THREADS_NUM; sample_num++ ) {

                        /* Generate next lottery sample (steps A2.2, A2.3, A2.4): */
                        Fisher_Yates_shuffle(stream,D_UNIFORM01_BUF,&D_UNIFORM01_IDX,PERMUT_BUF);

                        /* A2.5: (Copy stage) for i from 0 to M-1 do RESULTS_ARRAY[i]=PERMUT_BUF[i] */
                        #pragma omp simd
                        for( i=0; i<M; i++ ) RESULTS_ARRAY[thr*ONE_THR_PORTION_SIZE + sample_num*M + i] = PERMUT_BUF[i];
                    }

                    vslDeleteStream( &stream );
                }

                mkl_free(D_UNIFORM01_BUF);
            }

            mkl_free(PERMUT_BUF);
        }
    }
    t = dsecnd() - t; /* Time spent, measured in seconds. */
    printf("Performance: %.2f ms\n", t*1e3 ); /* Convert to milliseconds. */



    /* Print 3 last lottery samples */
    #pragma novector /* No need for vectorization when printing results sequentially */
    for( sample_num=EXPERIM_NUM-3; sample_num<EXPERIM_NUM; sample_num++ ) {
        /* Print current generated sample */
        printf("Sample %2d of lottery %d of %d: ", (int)sample_num, M, N);
        #pragma novector /* No need for vectorization while printing */
        for( i=0; i<M; i++ ) printf("%2d, ", (int)RESULTS_ARRAY[sample_num*M+i]);
        printf("\n");
    }

    mkl_free(RESULTS_ARRAY);

	system("pause");
    return 0;
}