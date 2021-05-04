#include <iostream>
#include <chrono>
#include <vector>

int main() {
    std::vector<int> trials{ 10, 100, 1000, 10000, 100000, 1000000, 10000000, 10000000 };

    double* temp;
    for (int i : trials) {
        auto start = std::chrono::high_resolution_clock::now();
        for (int j = 0; j < 10000; j++) {
            temp = new double[i];
        }
        auto finish = std::chrono::high_resolution_clock::now();

        std::chrono::nanoseconds ns = std::chrono::duration_cast<std::chrono::nanoseconds>(finish - start);
        std::cout << "An array of size " << i << " took " << ns.count() << " nanoseconds to run." << std::endl;
    }
    delete[] temp;
}
