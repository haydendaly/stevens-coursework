#!/usr/bin/env python
# coding: utf-8

# # Assignment Details
# Create a function called FizzBuzzer, that takes a sequential container of integer numbers as its only parameter.
# 
# For each number in the sequence, output the number to the screen. Howerver, if the number is divisible by 3, output the word Buzz instead of the number. If the number is divisible by 5, output Fizz to the screen instead of the number. If the number is divisble by both, output BuzzFizz to the screen instead of the number.
# 
# In your main code, call the function with a sequence consisting of the numbers between 10 and 250. Do not hardcode this sequence using an array literal, but rather use code to generate the sequence.

# # FizzBuzz Function
# Takes in input of a list. Iterates through it with a variable x. Performs modulo functions on x to determine whether it is divisble by 5, 3 or neither and outputs the given strings.

# In[7]:


def fizzbuzz(lst):
    for x in lst:
        if x%3 == 0 and x%5 == 0:
            print('BuzzFizz')
        elif x%3 == 0:
            print('Buzz')
        elif x%5 == 0:
            print('Fizz')
        else:
            print(x)


# # Initial Parameters and Implementing Function
# Setup a list ranging from the given parameters using the range function. Ran the fizzbuz function of the list.

# In[8]:


lst = range(10,250)
fizzbuzz(lst)

