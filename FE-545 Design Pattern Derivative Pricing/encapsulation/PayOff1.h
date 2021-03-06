//
//  PayOff1.h
//  notes
//
//  Created by Hayden Daly on 1/31/21.
//

#ifndef PAYOFF_H
#define PAYOFF_H

class PayOff
{
public:
    enum OptionType {call, put, digitalcall};
    PayOff (double Strike_, OptionType TheOptionType_);
    double operator()(double Spot) const;
    
private:
    double Strike;
    OptionType TheOptionsType;
};
#endif
