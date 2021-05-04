#include <iostream>

void insertionSort(int arr[], int n) {
    int i, key, j;
    for (i = 1; i < n; i++) {
        key = arr[i];
        j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
    return;
}

void naiveBubbleSort(int arr[], int n) {
    int i, j;
    for (i = 0; i < n - 1; i++)
        for (j = 0; j < n-i-1; j++)
            if (arr[j] > arr[j+1])
                swap(&arr[j], &arr[j+1]);
}

void bubbleSort(int arr[], int n) {
    int i, j;
    bool swapped;
    for (i = 0; i < n-1; i++) {
        swapped = false;
        for (j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                swap(&arr[j], &arr[j+1]);
                swapped = true;
            }
        }
        if (swapped == false) break;
    }
}

void mergeSort(int arr[], int left, int right) {
    if (left >= right) return;
    int mid = (left + right) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid+1, right);
    merge(arr, left, mid, right);
}

int partition(int arr[], int left, int right) {
    int ptr1 = left;
    int ptr2 = right-1;
    int pivot = arr[right];
    while (true) {
        while (arr[ptr1] < pivot]) ptr1++;
        while (ptr2 > 0 && arr[ptr2] > pivot) ptr2--;
        if (ptr1 < ptr2)
            swap(arr, ptr1, ptr2);
        else
            break;
    }
    return ptr1;
}

void quickSort(int arr[], int left, int right) {
    if (left + 10 > right) {
        insertSort(arr, left, right);
    } else {
        int p = selectPivot(arr, left, right);
        swap(arr, p, right-1);
        int i = partition(arr, i, right);
        swap(arr, i, right-1);
        quickSort(arr, left, i-1);
        quickSort(arr, i+1, right);
    }
}

int min(int arr[], int n) {
    int i = 0;
    int minVal = arr[0];
    for (i = 1; i < n; i++) {
        if (arr[i] < minVal)
            minVal = arr[i];
    }
    return minVal;
}

int select(int arr[], int left, int right, int k) {
    if (left + 10 > right) {
        return naiveAlgorithm(arr, left, right, k);
    } else {
        int j = selectPivot(arr, left, right);
        swap(arr, j, right - 1);
        int i = partition(arr, left, right);
        swap(arr, i, right - 1);
        int p = i + 1;
        if (k == p) return arr[i];
        if (k < p) return select(arr, left, i - 1, k);
        if (k > p) return select(arr, i + 1, right, k - p);
    }
}

// helper functions
// void swap(int *r, int *s) {
//     int temp = *r;
//     *r = *s;
//     *s = temp;
//     return;
// }

// void merge(int arr[], int left, int mid, int right) {
//     int i = 0;
//     int j = mid;
//     while (i < mid && j < right) {
//         if (arr[i] >= arr[j]) {
//             i++;
//         } else {
//             j++;
//         }
//     }
// }

int main()
{
    int unsortedArr[] = { 8, 1, 4, 9, 0, 6, 5, 2, 7, 3 };

    // Important (!) this function mutates the actual value and no need for returning in this case
    bubbleSort(unsortedArr, 10);

    for (int i = 0; i < 10; i++) {
        std::cout << unsortedArr[i] << '\n';
    }

    return 0;
}