# Must run unitTest while in the unittest directory (more flexibility can be added in future refactors)
import sys
import os
sys.path.append(os.path.abspath('../userstories'))

from prettytable import PrettyTable;

import unittest
from jbUserStories import us01, us02, us03, us04, us05, us08, us09, us12
from hdUserStories import us35, us36, us29, us39, us06, us07, us34, us21
from gaUserStories import us38, us27, us30, us31, us10, us41, us42

class Tests(unittest.TestCase):
    def test_us01(self):
        input = {
            'individualData': {
                '@I1@': {
                    'NAME': 'Date After Current /Date/',
                    'BIRT': '2020-03-07',
                    'DEAT': 'N/A',
                    'BIRTLine': '20'
                },
                '@I2@': {
                    'NAME': 'Valid /Date/',
                    'BIRT': '2019-03-07',
                    'DEAT': 'N/A'}
                },
            'familyData': {}
        }

        testTable = PrettyTable()
        testTable.field_names = ['ID', 'Name', 'Date Tag', 'Date', '[US40] Line Number']
        testTable.add_row(['@I1@', 'Date After Current /Date/', 'BIRT', '2020-03-07', '20' ])
        testTableEmp = PrettyTable()
        testTableEmp.field_names = ['FAM ID', 'Date Tag', 'Date', '[US40] Line Number']

        output = { 'invalidIndiDates': testTable.get_string(), 'invalidFamDates': testTableEmp.get_string() }
        self.assertEqual(us01(input), output)

    def test_us02(self):
        input = {'individualData': {'@I1@': {'NAME': 'HUSB', 'BIRT': '2018-03-07'}, '@I2@': {'NAME': 'WIFE', 'BIRT': '2018-03-07'} }, 'familyData': {'@F1@': {'HUSB': '@I1@', 'HUSB_NAME': 'HUSB', 'WIFE': '@I2@', 'WIFE_NAME': 'WIFE', 'MARR': '2018-03-06', 'MARRLine': '18'}} }

        testTable = PrettyTable()
        testTable.field_names = ['FAM ID', 'Married', 'Husband ID', 'Husband Name', 'Husband Birthday', 'Wife ID', 'Wife Name', 'Wife Birthday', '[US40] Line Number']
        testTable.add_row(['@F1@', '2018-03-06', '@I1@', 'HUSB', '2018-03-07', '@I2@', 'WIFE', '2018-03-07', '18' ])

        output = testTable
        self.assertEqual(us02(input).get_string(), output.get_string())

    def test_us04(self):
        input = {'individualData': {'@I1@': {'NAME': 'HUSB', 'BIRT': '2018-03-07'}, '@I2@': {'NAME': 'WIFE', 'BIRT': '2018-03-07'} }, 'familyData': {'@F1@': {'HUSB': '@I1@', 'HUSB_NAME': 'HUSB', 'WIFE': '@I2@', 'WIFE_NAME': 'WIFE', 'MARR': '2018-03-06', 'DIV': '2018-03-05', 'DIVLine': '1000'}} }

        testTable = PrettyTable()
        testTable.field_names = ['FAM ID', 'Married', 'Divorced', 'Husband ID', 'Husband Name', 'Wife ID', 'Wife Name', '[US40] Line Number']
        testTable.add_row(['@F1@', '2018-03-06', '2018-03-05', '@I1@', 'HUSB', '@I2@', 'WIFE', '1000'])

        output = testTable
        self.assertEqual(us04(input).get_string(), output.get_string())

    def test_us05(self):
        input = {'individualData': {'@I1@': {'NAME': 'HUSB', 'DEAT': '2018-03-07'}, '@I2@': {'NAME': 'WIFE', 'DEAT': '2018-03-05'} }, 'familyData': {'@F1@': {'HUSB': '@I1@', 'HUSB_NAME': 'HUSB', 'WIFE': '@I2@', 'WIFE_NAME': 'WIFE', 'MARR': '2018-03-06', 'MARRLine': '10'}} }

        testTable = PrettyTable()
        testTable.field_names = ['FAM ID', 'Married', 'Husband ID', 'Husband Name', 'Husband Death', 'Wife ID', 'Wife Name', 'Wife Death', '[US40] Line Number']
        testTable.add_row(['@F1@', '2018-03-06', '@I1@', 'HUSB', '2018-03-07', '@I2@', 'WIFE', '2018-03-05', '10' ])

        output = testTable

        self.assertEqual(us05(input).get_string(), output.get_string())

    def test_us35(self):
        input = { 'individualData': {'@I1@': {'NAME' : 'Hayden /Daly/', 'BIRT': '2019-07-06'}, '@I2@': {'NAME' : 'Todd /Daly/', 'BIRT': '2018-03-07'}} }

        testTable = PrettyTable()
        testTable.field_names = ['ID', 'Name', 'Birthday']
        testTable.add_row(['@I1@', 'Hayden /Daly/', '2019-07-06'])

        output = testTable
        self.assertEqual(us35(input).get_string(), output.get_string())

    def test_us36(self):
        input = { 'individualData': {'@I1@': {'NAME' : 'Hayden /Daly/', 'DEAT': '2019-07-06'}, '@I2@': {'NAME' : 'Todd /Daly/', 'BIRT': '2019-03-07', 'DEAT': 'N/A'} } }

        testTable = PrettyTable()
        testTable.field_names = ['ID', 'Name', 'Death']
        testTable.add_row(['@I1@', 'Hayden /Daly/', '2019-07-06'])

        output = testTable
        self.assertEqual(us36(input).get_string(), output.get_string())

    def test_us38(self):
        input = { 'individualData': {'@I1A': {'NAME' : 'Not /Upcoming/ /Birthday/', 'BIRT': '1999-10-29', 'ALIVE': 'True'}, '@I2@': {'NAME': 'Upcoming /Birthday/', 'BIRT': '1999-08-25', 'ALIVE': 'True'} } }

        testTable = PrettyTable()
        testTable.field_names = ['ID', 'Name', 'Birthday']
        testTable.add_row(['@I2@', 'Upcoming /Birthday/', '1999-08-25'])

        output = testTable
        self.assertEqual(us38(input).get_string(), output.get_string())

    def test_us27(self):
        output = '19'
        self.assertEqual(us27('1999-10-29', 'N/A', 'True'), output)

    def test_us27_2(self):
        output = '100'
        self.assertEqual(us27('1800-01-01', '1900-01-01', 'False'), output)

    def test_us27_3(self):
        output = '100'
        self.assertEqual(us27('1800-01-01', '1900-01-01', 'False'), output)

    def test_us30(self):
        inputDict = {
            'individualData': {
                '@US30_01@': {
                    'NAME': 'Deceased Married /Person/',
                    'ALIVE': 'False',
                    'FAMS': [ '@US30@' ]
                },
                '@US30_02@': {
                    'NAME': 'Living Married /Person/',
                    'ALIVE': 'True',
                    'FAMS': [ '@US30@' ]
                }
            },
            'familyData': {
                '@US30@': {
                    'DIV': 'N/A'
                }
            }
        }

        expectedOutputTable = PrettyTable()
        expectedOutputTable.field_names = [ 'ID', 'Name' ]
        expectedOutputTable.add_row( [ '@US30_02@', 'Living Married /Person/' ] )

        self.assertEqual( us30( inputDict ).get_string(), expectedOutputTable.get_string() )

    def test_us31(self):
        inputDict = {
            'individualData': {
                '@US31_01@': {
                    'NAME': 'Deceased Single /Person/',
                    'ALIVE': 'False',
                    'AGE': 'N/A',
                    'FAMS': 'N/A'
                },
                '@US31_02@': {
                    'NAME': 'Living Single /Person/ Over 30',
                    'ALIVE': 'True',
                    'AGE': '40',
                    'FAMS': 'N/A'
                },
                '@US31_03@': {
                    'NAME': 'Living Single /Person/ Under 30',
                    'ALIVE': 'True',
                    'AGE': '29',
                    'FAMS': 'N/A'
                }
            },
            'familyData': { }
        }

        expectedOutputTable = PrettyTable()
        expectedOutputTable.field_names = [ 'ID', 'Name' ]
        expectedOutputTable.add_row( [ '@US31_02@', 'Living Single /Person/ Over 30' ] )

        self.assertEqual( us31( inputDict ).get_string(), expectedOutputTable.get_string() )

    def test_us29(self):
        input = { 'individualData': {'@I1@': {'NAME' : 'Hayden /Daly/', 'DEAT': '2019-06-06'}, '@I2@': {'NAME' : 'Todd /Daly/', 'BIRT': '2019-03-07', 'DEAT': 'N/A'} } }

        testTable = PrettyTable()
        testTable.field_names = ['ID', 'Name']
        testTable.add_row(['@I1@', 'Hayden /Daly/'])

        output = testTable
        self.assertEqual(us29(input).get_string(), output.get_string())

    def test_us39(self):
        input = { 'familyData' : {'@F1@': {'MARR': '2017-08-29', 'HUSB_NAME': 'Todd /Daly/', 'WIFE_NAME': 'Amy /Fisher/'}, '@F2@': {'MARR': '1962-06-14', 'HUSB_NAME': 'Lee /Daly/', 'WIFE_NAME': 'Betty /Berardini/'} } }

        testTable = PrettyTable()
        testTable.field_names = ['Family ID', 'Husband', 'Wife', 'Marriage Date' ]
        testTable.add_row(['@F1@', 'Todd /Daly/', 'Amy /Fisher/', '2017-08-29'])

        output = testTable
        self.assertEqual( us39( input ).get_string(), output.get_string())

    def test_us10(self):
        input = {
            'individualData': {
                '@US10_01@': {
                    'NAME': 'Married Before /14/',
                    'BIRT': '1800-01-01'
                },
                '@US10_02@': {
                    'NAME': 'Not Married Before /14/',
                    'BIRT': '1790-01-01'
                }
            },
            'familyData': {
                '@US10@': {
                    'HUSB': '@US10_01@',
                    'WIFE': '@US10_02@',
                    'HUSB_NAME': 'Married Before /14/',
                    'WIFE_NAME': 'Not Married Before /14/',
                    'MARR': '1810-01-01'
                }
            }
        }

        testTable = PrettyTable()
        testTable.field_names = [ 'Fam ID', 'Marriage Date', 'ID', 'Name', 'Birthday', 'Age During Marriage' ]
        testTable.add_row(['@US10@', '1810-01-01', '@US10_01@', 'Married Before /14/', '1800-01-01', '10'])

        output = testTable

        self.assertEqual( us10( input ).get_string(), output.get_string())

    def test_us03(self):
        input = {
            'individualData': {
                '@US03@': {
                    'NAME': 'Died before born',
                    'BIRT': '2019-01-01',
                    'DEAT': '2018-01-01'
                }
            }
        }

        testTable = PrettyTable()
        testTable.field_names = [ 'ID', 'Name', 'Birth', 'Death']
        testTable.add_row(['@US03@', 'Died before born', '2019-01-01', '2018-01-01'])

        output = testTable
        self.assertEqual( us03( input ).get_string(), output.get_string())

    def test_us07(self):
        input = {
            'individualData': {
                '@US06.1@': {
                    'NAME' : 'Old Guy',
                    'AGE' : '151',
                    'BIRT' : 'Random Date'
                },
                '@US06.2@' : {
                    'NAME' : 'Young Guy',
                    'AGE' : '25',
                    'BIRT' : 'Random Date'
                }
            }
        }

        testTable = PrettyTable()
        testTable.field_names = [ 'ID', 'NAME', 'AGE', 'BIRTHDATE']
        testTable.add_row([ '@US06.1@', 'Old Guy', '151', 'Random Date'])

        output = testTable

        self.assertEqual( us07( input ).get_string(), output.get_string())

    def test_us06(self):
        input = {
            'individualData': {
                '@US07.1@': {
                    'DEAT' : '2017-01-01'
                },
                '@US07.2@' : {
                    'DEAT' : 'N/A'
                },
                '@US07.3@': {
                    'DEAT' : '2019-01-01'
                },
                '@US07.4@' : {
                    'DEAT' : 'N/A'
                }
            },
            'familyData': {
                '@US07.5' : {
                    'DIV' : '2018-01-01',
                    'HUSB' : '@US07.2@',
                    'WIFE' : '@US07.1@',
                    'HUSB_NAME' : 'Husband',
                    'WIFE_NAME' : 'Wife'
                },
                '@US07.6@' : {
                    'DIV' : '2018-01-01',
                    'HUSB' : '@US07.3@',
                    'WIFE' : '@US07.4@',
                    'HUSB_NAME' : 'Husband',
                    'WIFE_NAME' : 'Wife'
                }
            }
        }

        testTable = PrettyTable()
        testTable.field_names = ["Family ID", "Husband ID", "Husband", "Husband Death Date", "Wife ID", "Wife", "Wife Death Date", "Divorce Date"]
        testTable.add_row([ '@US07.6@', '@US07.3@', 'Husband', '2019-01-01', '@US07.4@', 'Wife', 'N/A', '2018-01-01'])

        output = testTable

        self.assertEqual( us06( input ).get_string(), output.get_string())

    def test_us09(self):
        input = {
            'individualData': {
                '@US09.1@': {
                    'DEAT' : '2017-01-01'
                },
                '@US09.2@' : {
                    'DEAT' : '2018-01-01'
                },
                '@US09.3@': {
                    'BIRT' : '2019-01-01',
                    'NAME' : 'Child',
                    'DEAT' : 'N/A'
                }
            },
            'familyData': {
                '@US09.4@' : {
                    'HUSB' : '@US09.2@',
                    'WIFE' : '@US09.1@',
                    'HUSB_NAME' : 'Husband',
                    'WIFE_NAME' : 'Wife',
                    'CHIL' : [ '@US09.3@' ]
                }
            }
        }


        testTable = PrettyTable()
        testTable.field_names = ['FAM ID', 'Child ID', 'Child Name', 'Child Birth', 'Husband ID', 'Husband Name', 'Husband Death', 'Wife ID', 'Wife Name', 'Wife Death']
        testTable.add_row([ '@US09.4@', '@US09.3@', 'Child', '2019-01-01', '@US09.2@', 'Husband', '2018-01-01', '@US09.1@', 'Wife', '2017-01-01'])


        output = testTable
        self.assertEqual( us09( input ).get_string(), output.get_string())


    def test_us41(self):
        input = "MAR 2000"  # Date without Days
        output = "01 MAR 2000"

        self.assertEqual( us41( input ), output )

    def test_us41_2(self):
        input = "1900"  # Date without Days and Months
        output = "01 JAN 1900"

        self.assertEqual( us41( input), output )

    def test_us41_3(self):
        input = "12 JUN 1900 09"    # Long Date
        output = "N/A"

        self.assertEqual( us41( input ), output )

    def test_us41_4(self):
        input = "18 SEP 1800"   # Complete Date
        output = "18 SEP 1800"

        self.assertEqual( us41( input ), output )

    def test_us42(self):
        input = "29 FEB 2015"   # Illegitimate Date - Leap Day on non-Leap Year
        output = "N/A"

        self.assertEqual( us42( input ), output )

    def test_us42_2(self):
        input = "42 MAR 2018"   # Illegitimate Date - Illegal Day
        output = 'N/A'

        self.assertEqual( us42( input ), output )

    def test_us42_3(self):
        input = "04 APR 1908"   # Legitimate Date
        output = "04 APR 1908"

        self.assertEqual( us42( input ), output )

    def test_us42_4(self):
        input = "07 NOV 3000"   # Date in the future
        output = "07 NOV 3000"

        self.assertEqual( us42( input ), output )

    def test_us21(self):
        input = {
            'individualData': {
                '@US21.1@': {
                    'SEX' : 'M'
                },
                '@US21.2@' : {
                    'SEX' : 'M'
                }
            },
            'familyData': {
                '@US34.3@' : {
                    'HUSB' : '@US21.1@',
                    'WIFE' : '@US21.2@',
                    'HUSB_NAME' : 'Husband',
                    'WIFE_NAME' : 'Wife'
                }
            }
        }

        testTable = PrettyTable()
        testTable.field_names = ["FAMILY ID", "NAME", "ROLE", "GENDER"]
        testTable.add_row(['@US34.3@', 'Wife', 'Wife', 'M'])

        output = testTable
        self.assertEqual( us21( input ).get_string(), output.get_string() )

    def test_us34(self):
        input = {
            'individualData': {
                '@US34.1@': {
                    'AGE' : '25'
                },
                '@US34.2@' : {
                    'AGE' : '54'
                }
            },
            'familyData': {
                '@US34.3@' : {
                    'HUSB' : '@US34.1@',
                    'WIFE' : '@US34.2@',
                    'HUSB_NAME' : 'Husband',
                    'WIFE_NAME' : 'Wife'
                }
            }
        }


        testTable = PrettyTable()
        testTable.field_names = ["FAMILY ID", "AGE DIFFERENCE", "HUSB NAME", "HUSB AGE", "WIFE NAME", "WIFE AGE"]
        testTable.add_row(['@US34.3@', 29, 'Husband', '25', 'Wife', '54'])


        output = testTable
        self.assertEqual( us34( input ).get_string(), output.get_string())

    def test_us08(self):
        input = {
            'individualData': {
                '@US08.1@': {
                    'DEAT' : '2017-01-01'
                },
                '@US08.2@' : {
                    'DEAT' : '2018-01-01'
                },
                '@US08.3@': {
                    'BIRT' : '2019-01-01',
                    'NAME' : 'Child',
                    'DEAT' : 'N/A'
                }
            },
            'familyData': {
                '@US08.4@' : {
                    'HUSB' : '@US08.2@',
                    'WIFE' : '@US08.1@',
                    'HUSB_NAME' : 'Husband',
                    'WIFE_NAME' : 'Wife',
                    'MARR' : '2018-01-01',
                    'DIV' : '2019-05-05',
                    'CHIL' : '@US08.3@'
                }
            }
        }


        testTable = PrettyTable()
        testTable.field_names = ['FAM ID', 'Child ID', 'Child Name', 'Child Birth', 'Married']
        testTable.add_row([ '@US08.4@', '@US08.3@', 'Child', '2019-01-01', '2018-01-01'])


        output = testTable
        self.assertEqual( us08( input ).get_string(), output.get_string())

    def test_us12(self):
        input = {
            'individualData': {
                '@US12.1@': {
                    'BIRT' : '1958-01-01'
                },
                '@US12.2@' : {
                    'BIRT' : '1935-01-01'
                },
                '@US12.3@': {
                    'BIRT' : '2019-01-01',
                    'NAME' : 'Child',
                    'DEAT' : 'N/A'
                }
            },
            'familyData': {
                '@US12.4@' : {
                    'HUSB' : '@US12.2@',
                    'WIFE' : '@US12.1@',
                    'HUSB_NAME' : 'Husband',
                    'WIFE_NAME' : 'Wife',
                    'MARR' : '2018-01-01',
                    'CHIL' : '@US12.3@'
                }
            }
        }


        testTable = PrettyTable()
        testTable.field_names = ['FAM ID', 'Child ID', 'Child Name', 'Child Birth', 'Husband ID', 'Husband Name', 'Husband Birth', 'Wife ID', 'Wife Name', 'Wife Birth']
        testTable.add_row([ '@US12.4@', '@US12.3@', 'Child', '2019-01-01', '@US12.2@', 'Husband', '1935-01-01', '@US12.1@', 'Wife', '1958-01-01'])


        output = testTable
        self.assertEqual( us12( input ).get_string(), output.get_string())

unittest.main()
