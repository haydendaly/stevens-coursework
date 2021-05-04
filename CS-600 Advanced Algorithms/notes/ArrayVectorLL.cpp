#include <iostream>
#include <vector>
#include <list>
#include <string>

using namespace std;

// Slides availible here https://github.com/wangshusen/AdvancedAlgorithms/blob/master/Slides/2_Basic_1.pdf

/* Arrays */
void Array()
{
    // Fixed size
    // Random access has O(1)
    // Removing element has O(n)

    char arr[5] = { 'h', 'e', 'l', 'l', 'o' };    // Fixed size allocation of array
    arr[2] = 'c';
    for (int i = 0; i < sizeof(arr); i++) {
        cout << arr[i] << '\n';
    }

    /* Dynamic allocation of arrays */
    char* arrDyn = NULL;
    int n;
    cin >> n;
    arrDyn = new char[n];

    for (int i = 0; i < n; i++) {
        arrDyn[i] = 'a';
        cout << arrDyn[i];
    }

    delete [] arrDyn;    // Free memory or 'memory leak' can happen
}

/* Vectors */
void Vector()
{
    // Like array but capacity can automatically grow
    // New elements can be appended with push_back() in O(1)
    // Last element can be removed using pop_back() in O(1)

    vector<char> vec = { 'h', 'e', 'l', 'l', 'o' };

    // Dynamic size and contiguous memory meaning its memory is allocated as a single chunk https://stackoverflow.com/questions/11752857/what-is-the-meaning-of-contiguous-memory-in-c 

    char x = vec[1];  // Random access
    vec[2] = 'b';
    vec.push_back('s');   // Appends to end of vector
    vec.pop_back(); // Removes from end of vector

    vec.erase(vec.begin() + 1); // Deletes 2nd element O(n) because needs to move elements over

    vector<char> vec2(100);
    cout << vec2.size() << '\n';   // Vector capacity can grow, both will result in 100
    cout << vec2.capacity() << '\n';

    vec2.push_back('x');   // Dynamically grows, O(n) resize but amortized action. Copies all elements over.
    cout << vec2.size() << '\n';   // Prints 101
    cout << vec2.capacity() << '\n';   // Prints 200
}

/* List */
void List()
{
    // Node has properties prev, data, next
    list<char> l = { 'h', 'e', 'l', 'l', 'o' };

    // Cannot be indexed like: l[0] = 'a';

    cout << l.front() << '\n' << l.back() << '\n';  // access to front and back of DLL

    // Iterator
    list<char>::iterator iter = l.begin();
    cout << *iter << '\n';  // Will print first element
    iter++; // Iterates to the next element

    *iter = 'a';    // Changes 'e' to 'a' in this case

    l.push_back('s');   // Adds element to end of DLL in O(1)
    l.push_front('a');  // Adds element to front of DLL in O(1)

    l.pop_back();   // Removes element, both O(1)
    l.pop_front();
}

int main()
{
}