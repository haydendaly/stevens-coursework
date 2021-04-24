//
//
//
//                      MCStatistics.cpp
//
//

#include "MCStatistics.h"
#include <cmath>

using namespace std;

StatisticsMean::StatisticsMean()
    :
    RunningSum(0.0), PathsDone(0UL)
{
}
    
void StatisticsMean::DumpOneResult(double result)
{
    PathsDone++;
    RunningSum += result;
}

vector<vector<double> > StatisticsMean::GetResultsSoFar() const
{
    vector<vector<double> > Results(1);

    Results[0].resize(1);
    Results[0][0] = RunningSum / PathsDone;

    return Results;
}

StatisticsMC* StatisticsMean::clone() const
{
    return new StatisticsMean(*this);
}

StatisticsGatherer::StatisticsGatherer()
    :
    RunningSum(0.0), Variance(0.0), StandardDeviation(0.0), PathsDone(0UL), VarianceSum(0.0), SkewnessSum(0.0), KurtosisSum(0UL)
{
}

void StatisticsGatherer::DumpOneResult(double result)
{
    PathsDone++;
    RunningSum += result;
    
    VarianceSum += pow(result - (RunningSum / PathsDone), 2);
    SkewnessSum += pow(result - (RunningSum / PathsDone), 3);
    KurtosisSum += pow((result - (RunningSum / PathsDone)) / StandardDeviation, 4);
    
    Variance = VarianceSum / PathsDone;
    StandardDeviation = sqrt(Variance);
}

vector<vector<double>> StatisticsGatherer::GetResultsSoFar() const
{
    vector<vector<double>> result(1);
    
    result[0].push_back(RunningSum / PathsDone);
    result[0].push_back(Variance);
    result[0].push_back(SkewnessSum / (PathsDone * pow(StandardDeviation, 3)));
    result[0].push_back(KurtosisSum / PathsDone);
    
    return result;
}

StatisticsMC* StatisticsGatherer::clone() const
{
    return new StatisticsGatherer(*this);
}

StatisticsValueAtRisk::StatisticsValueAtRisk()
    :
    ConfidenceInterval(0.75), PathsDone(0UL)
{
}

void StatisticsValueAtRisk::DumpOneResult(double result)
{
    PathsDone++;
    AllResults.push_back(result);
    
    if (PathsDone >= 2) {
        if (AllResults[PathsDone - 2] == 0)
            SampleReturns.push_back(-100);
        else
            SampleReturns.push_back(100 * (result - AllResults[PathsDone - 2]) / AllResults[PathsDone - 2]);
    }
    
    sort(SampleReturns.begin(), SampleReturns.end());
}

vector<vector<double>> StatisticsValueAtRisk::GetResultsSoFar() const
{
    vector<vector<double>> result(1);
    
    result[0].resize(1);
    result[0][0] = SampleReturns[round((1 - ConfidenceInterval)*PathsDone) - 1];
    
    return result;
}

StatisticsMC* StatisticsValueAtRisk::clone() const
{
    return new StatisticsValueAtRisk(*this);
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

