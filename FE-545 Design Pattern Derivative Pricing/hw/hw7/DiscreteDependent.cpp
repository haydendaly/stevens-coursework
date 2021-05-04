//
//
//
//                    DiscreteDependent.cpp
//
//

#include "DiscreteDependent.h"

DiscreteDependent::DiscreteDependent(const MJArray& LookAtTimes_,
                                       double DeliveryTime_,
                                       const PayOffBridge& ThePayOff_)
                                       :
                                        PathDependent(LookAtTimes_),
                                        DeliveryTime(DeliveryTime_),
                                        ThePayOff(ThePayOff_),
                                        NumberOfTimes(LookAtTimes_.size())
{
}

unsigned long DiscreteDependent::MaxNumberOfCashFlows() const
{
     return NumberOfTimes;
}

MJArray DiscreteDependent::PossibleCashFlowTimes() const
{
    MJArray tmp(NumberOfTimes);
    
    // Create temporary array of potential cash flows where the values are index based. Delivery times will be linear and increasing dependent on index.
    for (int i = 0; i < NumberOfTimes; i++) {
        tmp[i] = DeliveryTime * (1.0 - (i / (double) NumberOfTimes));
    }
    
    return tmp;
}

unsigned long DiscreteDependent::CashFlows(const MJArray& SpotValues,
                                    std::vector<CashFlow>& GeneratedFlows) const
{
    for (int i = 0; i < NumberOfTimes; i++) {
        GeneratedFlows[i].TimeIndex = (unsigned long) i;
        GeneratedFlows[i].Amount = ThePayOff(SpotValues[i]);
    }

    return (unsigned long) GeneratedFlows.size();
}

PathDependent* DiscreteDependent::clone() const
{
    return new DiscreteDependent(*this);
}

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

