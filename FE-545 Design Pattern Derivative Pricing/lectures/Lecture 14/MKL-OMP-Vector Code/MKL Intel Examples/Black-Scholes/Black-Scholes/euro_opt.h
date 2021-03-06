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
!      Black-Scholes formula Example, common definitions
!******************************************************************************/

#ifndef __EURO_OPT_BENCH_H
#define __EURO_OPT_BENCH_H

#ifdef __DO_FLOAT__
    typedef float tfloat; 
#else
    typedef double  tfloat;
#endif

#define ALIGN_FACTOR 64

#define SEED 7777777

#define S0L     10.0f
#define S0H     50.0f
#define XL      10.0f
#define XH      50.0f

#define TL      1.0f
#define TH      2.0f

#define RISK_FREE  0.1f
#define VOLATILITY 0.2f

void InitData( int nopt, tfloat* *s0, tfloat* *x, tfloat* *t,
                   tfloat* *vcall_compiler, tfloat* *vput_compiler,
                   tfloat* *vcall_mkl, tfloat* *vput_mkl
             );

void FreeData( tfloat *s0, tfloat *x, tfloat *t,
                   tfloat *vcall_compiler, tfloat *vput_compiler,
                   tfloat *vcall_mkl, tfloat *vput_mkl
             );

void BlackScholesFormula_Compiler( int nopt,
    tfloat r, tfloat sig, tfloat * restrict s0, tfloat * restrict x,
    tfloat * restrict t, tfloat * restrict vcall, tfloat * restrict vput );

void BlackScholesFormula_MKL( int nopt,
    tfloat r, tfloat sig, tfloat * restrict s0, tfloat * restrict x,
    tfloat * restrict t, tfloat * restrict vcall, tfloat * restrict vput );

#endif // #ifndef __EURO_OPT_BENCH_H
