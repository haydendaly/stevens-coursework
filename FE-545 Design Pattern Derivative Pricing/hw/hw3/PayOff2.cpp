//
//
//                          PayOff2.cpp
//
//


#include "PayOff2.h"
#include <cmath>
#include <iostream>

using namespace std;

PayOffCall::PayOffCall(double Strike_) : Strike(Strike_)
{
}

double PayOffCall::operator () (double Spot) const
{
    return fmax(Spot-Strike,0.0);
}


double PayOffPut::operator () (double Spot) const
{
    return fmax(Strike-Spot,0.0);
}

PayOffPut::PayOffPut(double Strike_) : Strike(Strike_)
{
}

PayOffPOPut::PayOffPOPut(double Strike_, double n_) : Strike(Strike_), n(n_)
{
}

double PayOffPOPut::operator () (double Spot) const
{
    return fmax(Strike - pow(Spot, n), 0.0);
}

PayOffPOCall::PayOffPOCall(double Strike_, double n_) : Strike(Strike_), n(n_)
{
}

double PayOffPOCall::operator () (double Spot) const
{
    return fmax(pow(Spot, n) - Strike, 0.0);
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

