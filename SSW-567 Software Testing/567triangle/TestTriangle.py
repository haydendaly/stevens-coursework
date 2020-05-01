# -*- coding: utf-8 -*-
"""
Updated Jan 21, 2018
The primary goal of this file is to demonstrate a simple unittest implementation

@author: jrr
@author: rk
"""

import unittest

from Triangle import classifyTriangle

# This code implements the unit test functionality
# https://docs.python.org/3/library/unittest.html has a nice description of the framework

class TestTriangles(unittest.TestCase):
    # define multiple sets of tests as functions with names that begin

    def testRightTriangleA(self):
        self.assertEqual(classifyTriangle(3,4,5),'Right','3,4,5 is a Right triangle')

    def testRightTriangleB(self):
        self.assertEqual(classifyTriangle(5,3,4),'Right','5,3,4 is a Right triangle')

    def testEquilateralTriangleA(self):
        self.assertEqual(classifyTriangle(1,1,1),'Equilateral','1,1,1 should be equilateral')

    def testNotATriangle(self):
        self.assertEqual(classifyTriangle(2, 5, 8), 'NotATriangle', '2,5,8 is not a triangle')

    def testIsocelesTriangle(self):
        self.assertEqual(classifyTriangle(7, 7, 5), 'Isoceles', '7,4,5 is an Isoceles triangle')

    def testScaleneTriangle(self):
        self.assertEqual(classifyTriangle(6, 9, 10), 'Scalene', '6,9,10 is a Scalene triangle')

    def testEquilateralTriangleB(self):
        self.assertEqual(classifyTriangle(10, 10, 10), 'Equilateral', '10,10,10 is an equilateral triangle')

    def testNegativeInput(self):
        self.assertEqual(classifyTriangle(-1,2,3), 'InvalidInput', '-1,2,3 is not a valid input')

    def testOver200(self):
        self.assertEqual(classifyTriangle(1,5,201), 'InvalidInput', '1,5,201 is not a valid input')

if __name__ == '__main__':
    print('Running unit tests')
    unittest.main()
