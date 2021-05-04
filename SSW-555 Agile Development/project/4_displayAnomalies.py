# /*******************************************************************************
#  Author		: Gil Gerard Austria, Justin Bernstein, Hayden Daly
#  Date			: 2019-06-09
#  Version      : Sprint.02.Proj.06
#  Description	: Parses Dictionary Data to Output All Anomalies in Individuals and Families Using Functions Imported from UserStories
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

# Anomalies:
#   us07 -
#   us10 -
#   us15
def displayAnomalies(fileName, GEDCOM_dict):

    outputFile = fileName[:-4] + '_output.txt'

    us10 = gaUserStories.us10(GEDCOM_dict)
    with open(outputFile, 'a+') as output:
        output.write("[us10] - Married Before Spouses are 14 Years Old\n")
        output.write(us10.get_string(title="[us10] - Married Before Spouses are 14 Years Old")+'\n\n')
    print('\n[us10] Married Before Spouses are 14 Years Old')
    print( us10 )

    us07 = hdUserStories.us07(GEDCOM_dict)
    with open(outputFile, 'a+') as output:
        output.write("[us07] - Age over 150 Years Old\n")
        output.write(us07.get_string(title="[us07] - Age over 150 Years Old")+'\n\n')
    print('\n[us07] Age over 150 Years Old')
    print( us07 )

    return

def main(fileName, GEDCOM_dict):

    # Case when the Program is Run Directly from Command Line and on an Valid Input File (Sanitized GEDCOM File from 1_sanitizedGEDCOM.py)
    if ( fileName.endswith('_dict.json') ):
        # READ FROM JSON DATA
        with open( fileName ) as GEDCOM_JSON:
            GEDCOM_dict = json.loads( GEDCOM_JSON.read() )

        displayAnomalies( fileName, GEDCOM_dict )

        return
    # Case when the Program is run from 0_main.py
    else:
        if ( len(GEDCOM_dict) != 0 ):
            displayAnomalies( fileName, GEDCOM_dict )

            return
        else:
            raise 'Empty Input, no GEDCOM Dictionary Data to Display'

    return


if __name__ == '__main__':
    main(sys.argv[1], {})
