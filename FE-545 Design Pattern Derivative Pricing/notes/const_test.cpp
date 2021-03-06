#include <iostream>

using namespace std;

class Rectangle
{
private:
    double width, height;
public:
    void assign_values(double, double);
    double get_area() const
    {
        return width * height;
    }
};

void Rectangle::assign_values (double width_, double height_)
{
    width = width_;
    height = height_;
}

int main() {
    Rectangle rect;
    rect.assign_values(10, 10.5);
    cout << rect.get_area() << endl;
}
