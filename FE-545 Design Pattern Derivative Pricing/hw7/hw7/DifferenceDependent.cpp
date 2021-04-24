//
//
//
//                    Difference.cpp
//
//

#include "Difference.h"

DifferenceDependent::DifferenceDependent(const MJArray& LookAtTimes_,
                                       double DeliveryTime_,
                                       PathDependent *TheOption1_,
                                       PathDependent *TheOption2_)
                                       :
                                        PathDependent(LookAtTimes_),
                                        DeliveryTime(DeliveryTime_),
                                        TheOption1(TheOption1_),
                                        TheOption2(TheOption2_),
                                        NumberOfTimes(LookAtTimes_.size())
{
}

unsigned long DifferenceDependent::MaxNumberOfCashFlows() const
{
     return NumberOfTimes;
}

MJArray DifferenceDependent::PossibleCashFlowTimes() const
{
    MJArray tmp(NumberOfTimes);
    
    // Create temporary array of potential cash flows where the values are index based. Delivery times will be linear and increasing dependent on index.
    for (int i = 0; i < NumberOfTimes; i++) {
        tmp[i] = DeliveryTime * (1.0 - (i / (double) NumberOfTimes));
    }
    
    return tmp;
}

unsigned long DifferenceDependent::CashFlows(const MJArray& SpotValues,
                                    std::vector<CashFlow>& GeneratedFlows) const
{
    std::vector<CashFlow>& GeneratedFlows1 = GeneratedFlows;
    std::vector<CashFlow>& GeneratedFlows2 = GeneratedFlows;
    std::vector<double> Values1(NumberOfTimes), Values2(NumberOfTimes);
    
    unsigned long CashFlows1 = TheOption1->CashFlows(SpotValues, GeneratedFlows1);
    unsigned long CashFlows2 = TheOption2->CashFlows(SpotValues, GeneratedFlows2);
    for (unsigned long i = 0; i < CashFlows1; i++)
        Values1[i] = GeneratedFlows1[i].Amount;
    for (unsigned long i = 0; i < CashFlows2; i++)
        Values2[i] = GeneratedFlows2[i].Amount;

    for (int i = 0; i < NumberOfTimes; i++) {
        GeneratedFlows[i].TimeIndex = (unsigned long) i;
        GeneratedFlows[i].Amount = std::abs(Values1[i] - Values2[i]);
    }
    
    return (unsigned long) GeneratedFlows.size();
}

PathDependent* DifferenceDependent::clone() const
{
    return new DifferenceDependent(*this);
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

