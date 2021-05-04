# /*******************************************************************************
#  Author		: Gil Gerard Austria, Justin Bernstein, Hayden Daly
#  Date			: 2019-06-09
#  Version      : Sprint.02.Proj.06
#  Description	: Parses Dictionary Data to Output All Errors in Individuals and Families Using Functions Imported from UserStories
#                 Creates/Appends to Txt file ( {fileName}_output.txt )
#                 Returns Table with Individual Data
#  Github       : https://github.com/haydendaly/GEDCOM-Parser
#  Pledge		:"I pledge my honor that I have abided by the Stevens Honor System"	- Gil Gerard Austria, Justin Bernstein, Hayden Daly
#  *******************************************************************************/

# Built-in Python Modules
import sys
import json

# Non-Built-In Python Modules that Need to be Installed
from prettytable import PrettyTable

# Import userstories
from userstories import hdUserStories, jbUserStories, gaUserStories


# Errors:
#   us01 -
#   us02 -
#   us03 -
#   us04 -
#   us05 -
#   us06 -
#   us21 -
#   us42 - (Implemented Directly in All Functions that Output Errors (in userstories))
def displayErrors(fileName, GEDCOM_dict):

    us01 = jbUserStories.us01(GEDCOM_dict)
    with open(fileName[:-4] + '_output.txt', 'a+') as output:
        output.write('[us_01] - Error: Date Occurs After Current Date\n')
        output.write(us01['invalidIndiDates']+'\n\n')
        output.write(us01['invalidFamDates']+'\n\n')
    print('\n[us01] Error: Date Occurs After Current Date')
    print( us01 )


    us02 = jbUserStories.us02(GEDCOM_dict)
    with open(fileName[:-4] + '_output.txt', 'a+') as output:
        output.write("[us02] - Error: Birth Occurs After Marriage Date\n")
        output.write(us02.get_string(title="[us02] - Error: Birth Occurs After Marriage Date")+'\n\n')
    print('\n[us02] Error: Date Occurs After Current Date')
    print( us02 )

    us03 = jbUserStories.us03(GEDCOM_dict)
    with open(fileName[:-4] + '_output.txt', 'a+') as output:
        output.write("[us03] - Error: Birth Occurs After Death Date\n")
        output.write(us02.get_string(title="[us03] - Error: Birth Occurs After Death Date")+'\n\n')
    print('\n[us03] Error: Birth date Occurs After Death Date')
    print( us03 )

    us04 = jbUserStories.us04(GEDCOM_dict)
    with open(fileName[:-4] + '_output.txt', 'a+') as output:
        output.write("[us04] - Error: Divorce Occurs Before Marriage Date\n")
        output.write(us04.get_string(title="[us04] - Error: Divorce Occurs Before Marriage Date")+'\n\n')
    print('\n[us04] Error: Marriage Occurs After Divorce Date')
    print( us04 )

    us05 = jbUserStories.us05(GEDCOM_dict)
    with open(fileName[:-4] + '_output.txt', 'a+') as output:
        output.write("[us05] - Error: Death Occurs Before Marriage Date\n")
        output.write(us05.get_string(title="[us05] - Error: Death Occurs Before Marriage Date")+'\n\n')
    print('\n[us05] Error: Marriage Occurs After Death Date')
    print( us05 )

    us06 = hdUserStories.us06(GEDCOM_dict)
    with open(fileName[:-4] + '_output.txt', 'a+') as output:
        output.write("[us06] - Error: Divorce Before Death\n")
        output.write(us06.get_string(title="[us06] - Error: Divorce Before Death")+'\n\n')
    print('\n[us06] Error: Divorce Before Death')
    print( us06 )

    us09 = jbUserStories.us09(GEDCOM_dict)
    with open(fileName[:-4] + '_output.txt', 'a+') as output:
        output.write("[us09] - Error: Birth Occurs After Parents Death Date\n")
        output.write(us09.get_string(title="[us09] - Error: Birth Occurs After Parents Death Date")+'\n\n')
    print('\n[us09] Error: Birth Occurs After Parents Death Date')
    print( us09 )

    us21 = hdUserStories.us21(GEDCOM_dict)
    with open(fileName[:-4] + '_output.txt', 'a+') as output:
        output.write("[us21] - Error: Incorrect Gender for Role\n")
        output.write(us21.get_string(title="[us21] - Error: Incorrect Gender for Role")+'\n\n')
    print('\n[us21] Error: Incorrect Gender for Role')
    print( us21 )

    us08 = jbUserStories.us08(GEDCOM_dict)
    with open(fileName[:-4] + '_output.txt', 'a+') as output:
        output.write("[us08] - Error: Birth Occurs Before Marriage or After Parents Divorce Date\n")
        output.write(us09.get_string(title="[us08] - Error: Birth Occurs Before Marriage or After Parents Divorce Date")+'\n\n')
    print('\n[us08] Error: Birth Occurs Before Marriage or After Parents Divorce Date')
    print( us08 )

    us12 = jbUserStories.us12(GEDCOM_dict)
    with open(fileName[:-4] + '_output.txt', 'a+') as output:
        output.write("[us12] - Error: Birth Occurs 60 or 80 years after the birth or mother and father respectively\n")
        output.write(us12.get_string(title="[us12] - Error: Birth Occurs 60 or 80 years after the birth or mother and father respectively")+'\n\n')
    print('\n[us12] Error: Birth Occurs 60 or 80 years after the birth or mother and father respectively')
    print( us12 )

    return

def main(fileName, GEDCOM_dict):

    # Case when the Program is Run Directly from Command Line and on an Valid Input File (Sanitized GEDCOM File from 1_sanitizedGEDCOM.py)
    if ( fileName.endswith('_dict.json') ):
        # READ FROM JSON DATA
        with open( fileName ) as GEDCOM_JSON:
            GEDCOM_dict = json.loads( GEDCOM_JSON.read() )

        displayErrors( fileName, GEDCOM_dict )

        return
    # Case when the Program is run from 0_main.py
    else:
        if ( len(GEDCOM_dict) != 0 ):
            displayErrors( fileName, GEDCOM_dict )

            return
        else:
            raise 'Empty Input, no GEDCOM Dictionary Data to Display'

    return


if __name__ == '__main__':
    main(sys.argv[1], {})
