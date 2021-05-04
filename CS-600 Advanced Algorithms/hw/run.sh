#!/bin/bash
PROG_NAME=$1
g++ -std=c++11 $PROG_NAME
if [[ $? == 0 ]]; then
    ./a.out
    rm ./a.out
fi