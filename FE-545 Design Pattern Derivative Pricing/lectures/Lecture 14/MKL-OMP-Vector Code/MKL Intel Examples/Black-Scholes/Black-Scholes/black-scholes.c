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
!      Black-Scholes formula Compiler based Example
!******************************************************************************/

#include <omp.h>
#include <mathimf.h>
#include "euro_opt.h"

#ifdef __DO_FLOAT__
#   define EXP(x)      expf(x)
#   define LOG(x)      logf(x)
#   define SQRT(x)     sqrtf(x)
#   define ERF(x)      erff(x)
#   define INVSQRT(x)  1.0f/sqrtf(x)

#   define QUARTER     0.25f
#   define HALF        0.5f
#   define TWO         2.0f
#else
#   define EXP(x)      exp(x)
#   define LOG(x)      log(x)
#   define SQRT(x)     sqrt(x)
#   define ERF(x)      erf(x)
#   define INVSQRT(x)  1.0/sqrt(x)

#   define QUARTER     0.25
#   define HALF        0.5
#   define TWO         2.0
#endif

/*
// This function computes the Black-Scholes formula.
// Input parameters:
//     nopt - length of arrays
//     s0   - initial price
//     x    - strike price
//     t    - maturity
//
//     Implementation assumes fixed constant parameters
//     r    - risk-neutral rate
//     sig  - volatility
//
// Output arrays for call and put prices:
//     vcall, vput
//
// Note: the restrict keyword here tells the compiler
//       that none of the arrays overlap in memory.
*/
void BlackScholesFormula_Compiler( int nopt,
    tfloat r, tfloat sig, tfloat * restrict s0, tfloat * restrict x,
    tfloat * restrict t, tfloat * restrict vcall, tfloat * restrict vput )
{
    int i;
    tfloat a, b, c, y, z, e;
    tfloat d1, d2, w1, w2;
    tfloat mr = -r;
    tfloat sig_sig_two = sig * sig * TWO;

    //#pragma omp parallel for shared(s0, x, t, vcall, vput)
    #pragma vector nontemporal (vcall, vput)
    #pragma omp simd
    for ( i = 0; i < nopt; i++ )
    {
        a = LOG( s0[i] / x[i] );
        b = t[i] * mr;
        z = t[i] * sig_sig_two;
        
        c = QUARTER * z;
        e = EXP ( b );
        y = INVSQRT( z );
                             
        w1 = ( a - b + c ) * y;
        w2 = ( a - b - c ) * y;
        d1 = ERF( w1 );
        d2 = ERF( w2 );
        d1 = HALF + HALF*d1;
        d2 = HALF + HALF*d2;

        vcall[i] = s0[i]*d1 - x[i]*e*d2;
        vput[i]  = vcall[i] - s0[i] + x[i]*e;
    }
}
