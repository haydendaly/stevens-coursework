//
//  PayOff2.cpp
//  notes
//
//  Created by Hayden Daly on 2/24/21.
//

#include "PayOff2.h"
#include <cmath>

//PayOffCall::PayOffCall(double Strike_) : Strike(Strike_) {}
//
//double PayOffCall::operator () (double Spot) const
//{
//    return fmax(Spot - Strike, 0.0);
//}
//
//PayOffPut::PayOffPut(double Strike_) : Strike(Strike_) {}
//
//double PayOffPut::operator () (double Spot) const
//{
//    return fmax(Strike - Spot, 0.0);
//}

PayOffDD::PayOffDD(double Lower_, double Upper_) : Lower(Lower_), Upper(Upper_) {}

double PayOffDD::operator() (double Spot) const
{
    return Spot <= Lower || Spot >= Upper ? 0 : 1;
}
