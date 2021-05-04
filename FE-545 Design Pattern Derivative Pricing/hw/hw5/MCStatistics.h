//
//
//
//                      MCStatistics.h
//
//

#ifndef STATISTICS_H
#define STATISTICS_H

#include <vector>

using namespace std;

class StatisticsMC
{
public:

    StatisticsMC(){}

    virtual void DumpOneResult(double result)=0;
    virtual vector<vector<double> > GetResultsSoFar() const=0;
    virtual StatisticsMC* clone() const=0;
    virtual ~StatisticsMC(){}

private:

};


class StatisticsMean : public StatisticsMC
{

public:

    StatisticsMean();
    virtual void DumpOneResult(double result);
    virtual vector<vector<double> > GetResultsSoFar() const;
    virtual StatisticsMC* clone() const;

private:

    double RunningSum;
    unsigned long PathsDone;

};


class StatisticsGatherer : public StatisticsMC
{

public:

    StatisticsGatherer();
    virtual void DumpOneResult(double result);
    virtual vector<vector<double>> GetResultsSoFar() const;
    virtual StatisticsMC* clone() const;

private:

    double RunningSum, Variance, StandardDeviation, VarianceSum, SkewnessSum;
    unsigned long PathsDone, KurtosisSum;

};

class StatisticsValueAtRisk : public StatisticsMC
{
    
public:
    
    StatisticsValueAtRisk();
    virtual void DumpOneResult(double result);
    virtual vector<vector<double>> GetResultsSoFar() const;
    virtual StatisticsMC* clone() const;

private:
    
    double ConfidenceInterval;
    vector<double> AllResults, SampleReturns;
    unsigned long PathsDone;
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

