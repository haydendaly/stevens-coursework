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
!      Black-Scholes formula Example, main() module
!******************************************************************************/

#include <stdio.h>
#include "euro_opt.h"
#include <stdlib.h>

int main(int argc, char * argv[])
{
    int nopt = 4*1024*1024;
    tfloat *s0, *x, *t, *vcall_mkl, *vput_mkl, *vcall_compiler, *vput_compiler;

    /* Read nopt number of options parameter from command line */
    if (argc < 2)
    {
        printf("Usage: expect nopt input integer parameter, defaulting to %d\n", nopt);
    }
    else
    {
        sscanf_s(argv[1], "%d", &nopt);
    }

    /* Allocate arrays, generate input data */
    InitData( nopt, &s0, &x, &t, &vcall_compiler, &vput_compiler, &vcall_mkl, &vput_mkl );

    /* Compute call and put prices using compiler math libraries */
    BlackScholesFormula_Compiler( nopt, RISK_FREE, VOLATILITY, s0, x, t, vcall_compiler, vput_compiler );

    /* Compute call and put prices using MKL VML functions */
    BlackScholesFormula_MKL( nopt, RISK_FREE, VOLATILITY, s0, x, t, vcall_mkl, vput_mkl );

    /* Display a few computed values */
    printf("call_compiler[0/%d]= %g\n", nopt, (double)(vcall_compiler[0]) );
    printf("put_compiler[0/%d]= %g\n", nopt, (double)(vput_compiler[0]) );
    printf("call_mkl[0/%d]= %g\n", nopt, (double)(vcall_mkl[0]) );
    printf("put_mkl[0/%d]= %g\n", nopt, (double)(vput_mkl[0]) );

    /* Deallocate arrays */
    FreeData( s0, x, t, vcall_compiler, vput_compiler, vcall_mkl, vput_mkl );

	system("pause");
    return 0;
}
