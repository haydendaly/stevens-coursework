//
//                      TreeMain.cpp
//      

#include "BinomialTree.h"
#include "TreeAmerican.h"
#include "TreeEuropean.h"
#include "BlackScholesFormulas.h"
#include "PayOffForward.h"
#include <iostream>
#include <ctime>
#include <cmath>

using namespace std;

int main()
{
	double Expiry = 365*2;
	double Strike = 125;
	double Spot = 120;
	double Vol = 0.10;
	double r = 0.05;
	double d = 0.0;
	unsigned long Steps = 24 * (unsigned long)Expiry; // Every hour until expiration

	cout << "\nExpiry: " << Expiry << " days";
	cout << "\nStrike: " << Strike;
	cout << "\nSpot: " << Spot;
	cout << "\nVolatility: " << Vol;
	cout << "\nRate of return: " << r;
    cout << "\nDividends: " << d;
    cout << "\nNumber of steps: " << Steps << "\n";

	int start_s = clock();
    
    PayOffCall thePayOff(Strike);

    ParametersConstant rParam(r);
    ParametersConstant dParam(d);

    TreeEuropean europeanOption(Expiry,thePayOff);
    TreeAmerican americanOption(Expiry,thePayOff);

    SimpleBinomialTree theTree(Spot,rParam,dParam,Vol,Steps,Expiry);
    double euroPrice = theTree.GetThePrice(europeanOption);
    double americanPrice = theTree.GetThePrice(americanOption);
	cout << "\nSimulation Results:\n";
	cout << "European price: " << euroPrice;
	cout <<"\nAmerican price: " << americanPrice << "\n";

    double BSPrice = BlackScholesCall(Spot,Strike,r,d,Vol,Expiry);
	cout << "\nBS formula results: \n";
	cout << "European price: " << BSPrice << "\n";
    
    PayOffForward forwardPayOff(Strike);
    TreeEuropean forward(Expiry,forwardPayOff);

    double forwardPrice = theTree.GetThePrice(forward);
    cout << "\nForward price by tree: " << forwardPrice;

    double actualForwardPrice = exp(-r*Expiry)*(Spot*exp((r-d)*Expiry)-Strike);
    cout << "\nForward price: " << actualForwardPrice << "\n";

	int stop_s = clock();
	cout << "\nTime: " << (stop_s - start_s) / double(CLOCKS_PER_SEC) << " seconds\n";

    double tmp;
    cin >> tmp;

	return 0;
}


