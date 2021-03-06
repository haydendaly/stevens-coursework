//
//  PayOff2.h
//  notes
//
//  Created by Hayden Daly on 2/24/21.
//

#ifndef PAYOFF2_H
#define PAYOFF2_H

class PayOff
{
public:
    PayOff(){};
    virtual double operator()(double Spot) const = 0;
    virtual ~PayOff(){}
};

//class PayOffCall : public PayOff
//{
//public:
//    PayOffCall(double Strike_);
//    virtual double operator()(double Spot) const;
//    virtual ~PayOffCall(){}
//
//private:
//    double Strike;
//};
//
//class PayOffPut : public PayOff
//{
//public:
//    PayOffPut(double Strike_);
//    virtual double operator()(double Spot) const;
//    virtual ~PayOffPut(){}
//
//private:
//    double Strike;
//};

class PayOffDD : public PayOff
{
public:
    PayOffDD(double Lower_, double Upper_);
    virtual double operator()(double Spot) const;
    virtual ~PayOffDD(){};
private:
    double Lower, Upper;
};

#endif
