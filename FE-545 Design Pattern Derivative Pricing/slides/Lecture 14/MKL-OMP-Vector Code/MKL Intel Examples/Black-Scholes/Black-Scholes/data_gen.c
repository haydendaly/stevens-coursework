/*******************************************************************************
! Copyright(C) 2014-2015 Intel Corporation. All Rights Reserved.
!
! The source code, information  and  material ("Material") contained herein is
! owned  by Intel Corporation or its suppliers or licensors, and title to such
! Material remains  with Intel Corporation  or its suppliers or licensors. The
! Material  contains proprietary information  of  Intel or  its  suppliers and
! licensors. The  Material is protected by worldwide copyright laws and treaty
! provisions. No  part  of  the  Material  may  be  used,  copied, reproduced,
! modified, published, uploaded, posted, transmitted, distributed or disclosed
! in any way  without Intel's  prior  express written  permission. No  license
! under  any patent, copyright  or  other intellectual property rights  in the
! Material  is  granted  to  or  conferred  upon  you,  either  expressly,  by
! implication, inducement,  estoppel or  otherwise.  Any  license  under  such
! intellectual  property  rights must  be express  and  approved  by  Intel in
! writing.
! 
! *Third Party trademarks are the property of their respective owners.
! 
! Unless otherwise  agreed  by Intel  in writing, you may not remove  or alter
! this  notice or  any other notice embedded  in Materials by Intel or Intel's
! suppliers or licensors in any way.
!
!*******************************************************************************
!  Content:
!      Black-Scholes formula Example, data initialization modules
!******************************************************************************/

#include <stdio.h>
#include <stdlib.h>
#include <ia32intrin.h>

#include "euro_opt.h"

/* Get uniformly distributed random value from [a, b] */
static tfloat RandFloat( tfloat a, tfloat b )
{
    return rand() / (tfloat)RAND_MAX*(b-a) + a;
}

/*
// This function allocates arrays to hold input and output parameters
// for the Black-Scholes formula.
//     nopt - length of arrays
// Random input parameters
//     s0   - initial price
//     x    - strike price
//     t    - maturity
// Output arrays for call and put prices
//     vcall_compiler, vcall_mkl
//     vput_compiler, vput_mkl
*/
void InitData( int nopt, tfloat* *s0, tfloat* *x, tfloat* *t,
                   tfloat* *vcall_compiler, tfloat* *vput_compiler,
                   tfloat* *vcall_mkl, tfloat* *vput_mkl
             )
{
    tfloat *ts0, *tx, *tt, *tvcall_compiler, *tvput_compiler, *tvcall_mkl, *tvput_mkl;
    int i;

    /* Allocate aligned memory */
    ts0             = (tfloat*)_mm_malloc( nopt * sizeof(tfloat), ALIGN_FACTOR);
    tx              = (tfloat*)_mm_malloc( nopt * sizeof(tfloat), ALIGN_FACTOR);
    tt              = (tfloat*)_mm_malloc( nopt * sizeof(tfloat), ALIGN_FACTOR);
    tvcall_compiler = (tfloat*)_mm_malloc( nopt * sizeof(tfloat), ALIGN_FACTOR);
    tvput_compiler  = (tfloat*)_mm_malloc( nopt * sizeof(tfloat), ALIGN_FACTOR);
    tvcall_mkl      = (tfloat*)_mm_malloc( nopt * sizeof(tfloat), ALIGN_FACTOR);
    tvput_mkl       = (tfloat*)_mm_malloc( nopt * sizeof(tfloat), ALIGN_FACTOR);

    if ( (ts0 == NULL) || (tx == NULL) || (tt == NULL) ||
         (tvcall_compiler == NULL) || (tvput_compiler == NULL) ||
         (tvcall_mkl == NULL) || (tvput_mkl == NULL) )
    {
        printf("Memory allocation failure\n");
        exit(-1);
    }

    srand( SEED );

    /* NUMA-friendly data init */
    #pragma omp parallel for ordered
    for ( i = 0; i < nopt; i++ )
    {
        #pragma omp ordered
        {
            ts0[i] = RandFloat( S0L, S0H );
            tx[i]  = RandFloat( XL, XH );
            tt[i]  = RandFloat( TL, TH );
        }

        tvcall_compiler[i] = 0.0;
        tvput_compiler[i]  = 0.0;
        tvcall_mkl[i] = 0.0;
        tvput_mkl[i]  = 0.0;
    }

    *s0 = ts0;
    *x  = tx;
    *t  = tt;
    *vcall_compiler = tvcall_compiler;
    *vput_compiler  = tvput_compiler;
    *vcall_mkl = tvcall_mkl;
    *vput_mkl  = tvput_mkl;
}

/* Deallocate arrays */
void FreeData( tfloat *s0, tfloat *x, tfloat *t,
                   tfloat *vcall_compiler, tfloat *vput_compiler,
                   tfloat *vcall_mkl, tfloat *vput_mkl
             )
{
    /* Free memory */
    _mm_free(s0);
    _mm_free(x);
    _mm_free(t);
    _mm_free(vcall_compiler);
    _mm_free(vput_compiler);
    _mm_free(vcall_mkl);
    _mm_free(vput_mkl);
}
