# Summary

## Properties

### Size
* Array:    Fixed
* Vector:   Can increase and decrease
* List:     Can increase and decrease

### Memory
* Array:    Contiguous
* Vector:   Contiguous
* List:     Not contiguous

### Time Complexities
* Array
    - Rand Access:  O(1)
    - push_back():  N/A
    - pop_back():   N/A
    - insert():     N/A
    - erase():      N/A
* Vector:
    - Rand Access:  O(1)
    - push_back():  O(1) (average)
    - pop_back():   O(1)
    - insert():     O(n) (average)
    - erase():      O(n) (average)
* List:
    - Rand Access:  N/A
    - push_back():  O(1)
    - pop_back():   O(1)
    - insert():     O(1)
    - erase():      O(1)

### Usage
* Array:    Fixed size throughout
* Vector:   
    - Random access
    - Insert/delete at ends are fast
    - Insert/delete in the front/middle are slow
* List:
    - Sequentially visting elements is fast but no random access
    - Frequent insertion and deletion at any position are okay.