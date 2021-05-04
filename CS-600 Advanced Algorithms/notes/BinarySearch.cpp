#include <iostream>
#include <chrono>

using namespace std;

// Slides availible here https://github.com/wangshusen/AdvancedAlgorithms/blob/master/Slides/2_Basic_2.pdf

/* Binary Search Recursive */
int RecursiveSearch(int arr[], int left, int right, int key)
{
    if (left > right) return -1;
    // O(logn) time complexity bc each iteration reduces size by half
    int mid = (left + right) / 2;
    if (arr[mid] == key) return mid;
    else if (arr[mid] > key) return RecursiveSearch(arr, left, mid - 1, key);
    else if (arr[mid] < key) return RecursiveSearch(arr, mid + 1, right, key);
}

/* Binary Search Iterative */
int IterativeSearch(int arr[], int left, int right, int key)
{
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == key) return mid;
        if (arr[mid] < key) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

int main()
{
    int arr[10] = { 3, 5, 12, 16, 17, 26, 32, 51, 53, 64 };

    auto t1 = chrono::high_resolution_clock::now();
    cout << RecursiveSearch(arr, 0, 9, 12);
    auto t2 = chrono::high_resolution_clock::now();

    auto duration = chrono::duration_cast<chrono::microseconds>( t2 - t1 ).count();
    cout << duration << '\n';
    return 0;
}