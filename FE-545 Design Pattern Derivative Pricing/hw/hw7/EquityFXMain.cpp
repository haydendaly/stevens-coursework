//
//
//        EquityFXMain.cpp
//
//
//
/*
    uses source files
    AntiThetic.cpp
    Arrays.cpp,
    ConvergenceTable.cpp,
    DifferenceDependent.cpp,
    DiscreteDependent.cpp,
    ExoticBSEngine.cpp
    ExoticEngine
    MCStatistics.cpp
    Normals.cpp
    Parameters.cpp,
    ParkMiller.cpp,
    PathDependent.cpp
    PathDependentAsian.cpp
    PayOff3.cpp,
    PayOffBridge.cpp,
    Random2.cpp,
  */
#include "ParkMiller.h"
#include <iostream>
using namespace std;
#include "MCStatistics.h"
#include "ConvergenceTable.h"
#include "AntiThetic.h"
#include "PathDependentAsian.h"
#include "DiscreteDependent.h"
#include "DifferenceDependent.h"
#include "ExoticBSEngine.h"

int main()
{

    double Expiry;
    double Strike;
    double Rebate;
    double Barrier;
    double Spot;
    double Vol;
    double r;
    double d;
    unsigned long NumberOfPaths;
    unsigned NumberOfDates;

    cout << "\nEnter expiry\n";
    cin >> Expiry;

    cout << "\nStrike\n";
    cin >> Strike;

    cout << "\nRebate\n";
    cin >> Rebate;
    
    cout << "\nBarrier\n";
    cin >> Barrier;

    cout << "\nEnter spot\n";
    cin >> Spot;

    cout << "\nEnter vol\n";
    cin >> Vol;

    cout << "\nr\n";
    cin >> r;

    cout << "\nd\n";
    cin >> d;

    cout << "\nNumber of dates\n";
    cin >> NumberOfDates;

    cout << "\nNumber of paths\n";
    cin >> NumberOfPaths;

    PayOffKORebate thePayOff(Strike, Rebate, Barrier);
    PayOffCall thePayOff2(Strike);

    MJArray times(NumberOfDates);

    for (unsigned long i=0; i < NumberOfDates; i++)
        times[i] = (i+1.0)*Expiry/NumberOfDates;

    ParametersConstant VolParam(Vol);
    ParametersConstant rParam(r);
    ParametersConstant dParam(d);

    DiscreteDependent theOption1(times, Expiry, thePayOff);
    PathDependentAsian theOption2(times, Expiry, thePayOff);
    
    DifferenceDependent theOption(times, Expiry, &theOption1, &theOption2);

    StatisticsMean gatherer;
    ConvergenceTable gathererTwo(gatherer);

    RandomParkMiller generator(NumberOfDates);
    
    AntiThetic GenTwo(generator);

    ExoticBSEngine theEngine(theOption, rParam, dParam, VolParam, GenTwo, Spot);

    theEngine.DoSimulation(gathererTwo, NumberOfPaths);

    vector<vector<double> > results =gathererTwo.GetResultsSoFar();


    cout <<"\nFor the Asian call price the results are \n";
  
    {
    for (unsigned long i=0; i < results.size(); i++)
    {
        for (unsigned long j=0; j < results[i].size(); j++)
            cout << results[i][j] << " ";

        cout << "\n";
    }}

    double tmp;
    cin >> tmp;

    return 0;
}
