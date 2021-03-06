//
//  PayOff1.cpp
//  notes
//
//  Created by Hayden Daly on 1/31/21.
//

#include "PayOff1.h"
#include <cmath>

PayOff::PayOff(double Strike_, OptionType TheOptionsType_)
:
    Strike(Strike_), TheOptionsType(TheOptionsType_)
{
}

double PayOff::operator ()(double spot) const
{
    switch (TheOptionsType)
    {
        case call:
            return fmax(spot-Strike, 0.0);
        case put:
            return fmax(Strike-spot, 0.0);
        case digitalcall:
            return spot > Strike ? 1.0 : 0.0;
        default:
            throw("unknown option type found");
    }
}
