//
//
//                          PayOff3.cpp
//
//

#include "PayOff3.h"
#include <cmath>

PayOffCall::PayOffCall(double Strike_) : Strike(Strike_)
{
}

double PayOffCall::operator () (double Spot) const
{
    return fmax(Spot-Strike,0.0);
}

PayOff* PayOffCall::clone() const
{
    return new PayOffCall(*this);
}


double PayOffPut::operator () (double Spot) const
{
    return fmax(Strike-Spot,0.0);
}

PayOffPut::PayOffPut(double Strike_) : Strike(Strike_)
{
}

PayOff* PayOffPut::clone() const
{
    return new PayOffPut(*this);
}

PayOffKORebate::PayOffKORebate(double Strike_, double Rebate_, double Barrier_) : Strike(Strike_), Rebate(Rebate_), Barrier(Barrier_)
{
}

double PayOffKORebate::operator () (double Spot) const
{
    return Spot < Barrier ? fmax(Spot - Strike, 0.0) : Rebate;
}

PayOffKORebate* PayOffKORebate::clone() const
{
    return new PayOffKORebate(*this);
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

