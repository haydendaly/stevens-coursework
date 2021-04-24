#include <iostream>
using namespace std;

class Rectangle
{
private:
    static double width, height;
public:
    Rectangle() {
        cout << "Constructor" << endl;
    }
    // ~Rectangle() {     // Destructor not needed, called automatically
    //     cout << "Destructor" << endl;
    // }
    Rectangle& operator=(const Rectangle& original) {
        width = original.width;
        height = original.height;
        original.width = 0;
        original.height = 0;
        return *this;
    }
    double get_area() {
        return width * height;
    }
};

double Rectangle::width = 10;
double Rectangle::height = 10;

int main() {
    auto_ptr<Rectangle> ptr1( new Rectangle() );
    auto_ptr<Rectangle> ptr2( new Rectangle() );
    cout << ptr1->get_area() << endl;
    cout << ptr2->get_area() << endl;
    ptr2 = ptr1;
    cout << ptr2->get_area() << endl;
    return 0;
}
