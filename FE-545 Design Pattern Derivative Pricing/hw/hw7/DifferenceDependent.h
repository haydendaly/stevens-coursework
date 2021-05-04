//
//
//                  DifferenceDependent.h
//
//

#ifndef DIFFERENCE_DEPENDENT_H
#define DIFFERENCE_DEPENDENT_H

#include "PathDependent.h"

class DifferenceDependent : public PathDependent
{
public:

    DifferenceDependent(const MJArray& LookAtTimes_,
                       double DeliveryTime_,
                       PathDependent *TheOption1_,
                       PathDependent *TheOption2_
               );

    virtual unsigned long MaxNumberOfCashFlows() const;
    virtual MJArray PossibleCashFlowTimes() const;
    virtual unsigned long CashFlows(const MJArray& SpotValues,
                                    std::vector<CashFlow>& GeneratedFlows) const;
    virtual ~DifferenceDependent(){}
    virtual PathDependent* clone() const;

private:

    double DeliveryTime;
    PathDependent* TheOption1;
    PathDependent* TheOption2;
    unsigned long NumberOfTimes;
};

#endif

/*
 *
 * Copyright (c) 2002
 * Mark Joshi
 *
 * Permission to use, copy, modify, distribute and sell this
 * software for any purpose is hereby
 * granted without fee, provided that the above copyright notice
 * appear in all copies and that both that copyright notice and
 * this permission notice appear in supporting documentation.
 * Mark Joshi makes no representations about the
 * suitability of this software for any purpose. It is provided
 * "as is" without express or implied warranty.
*/


