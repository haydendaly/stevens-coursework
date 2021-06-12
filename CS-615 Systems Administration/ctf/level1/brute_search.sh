#!/bin/bash

for value1 in {64..96}
do
	for value2 in {0..255}
	do
		nslookup 155.246.$value1.$value2 >> outfile.txt
	done
done

echo DONE
