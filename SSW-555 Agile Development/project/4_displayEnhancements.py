# /*******************************************************************************
#  Author		: Gil Gerard Austria, Justin Bernstein, Hayden Daly
#  Date			: 2019-06-09
#  Version      : Sprint.02.Proj.06
#  Description	: Using Functions Imported from UserStories, displays Additional Data about Individuals and Families
#                 Creates/Appends to Txt file ( {fileName}_output.txt )
#                 Returns Tables with Additional Data from User Story Enhancements
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

# Enhancements:
#   us27 - (Implemented/Called Directly in 3_displayIndividualData.py)
#   us28
#   us29 -
#   us30 -
#   us31 -
#   us34 -
#   us35 -
#   us36 -
#   us38 -
#   us39 -
#   us40 - (Implemented Directly in All Functions that Output Errors (in userstories))
#   us41 - (Implemented Directly in All Functions that Output Errors (in userstories))
def displayEnhancements(fileName, GEDCOM_dict):

    outputFile = fileName[:-4] + '_output.txt'

    us29 = hdUserStories.us29(GEDCOM_dict)
    with open(outputFile, 'a+') as output:
        output.write("[us29] - List Deceased\n")
        output.write(us29.get_string(title="[us29] - List Deceased")+'\n\n')
    print('\n[us29] List all deceased individuals')
    print(us29)

    us30 = gaUserStories.us30(GEDCOM_dict)
    with open(outputFile, 'a+') as output:
        output.write("[us30] - Living Married People\n")
        output.write(us30.get_string(title="[us30] - Living Married People")+'\n\n')
    print('\n[us30] Living Married People')
    print(us30)

    us31 = gaUserStories.us31(GEDCOM_dict)
    with open(outputFile, 'a+') as output:
        output.write("[us31] - Living Single People Over 30\n")
        output.write(us31.get_string(title="[us31] - Living Single People Over 30")+'\n\n')
    print('\n[us31] Living Single People Over 30')
    print(us31)

    us34 = hdUserStories.us34(GEDCOM_dict)
    with open(outputFile, 'a+') as output:
        output.write("[us34] - List Large Age Differences\n")
        output.write(us34.get_string(title="[us34] - List Large Age Differences")+'\n\n')
    print('\n[us34] List Large Age Differences')
    print( us34 )

    us35 = hdUserStories.us35(GEDCOM_dict)
    with open(outputFile, 'a+') as output:
        output.write("[us35] - Birth Within the Past 30 Days\n")
        output.write(us35.get_string(title="[us35] - Birth Within the Past 30 Days")+'\n\n')
    print('\n[us35] Birth Within the Past 30 Days')
    print( us35 )


    us36 = hdUserStories.us36(GEDCOM_dict)
    with open(outputFile, 'a+') as output:
        output.write("[us36] - Death Within the Past 30 Days\n")
        output.write(us36.get_string(title="[us36] - Death Within the Past 30 Days")+'\n\n')
    print('\n[us36] Death Within the Past 30 Days')
    print( us36 )


    us38 = gaUserStories.us38(GEDCOM_dict)
    with open(outputFile, 'a+') as output:
        output.write("[us38] - Upcoming Birthdays\n")
        output.write(us38.get_string(title="[us38] - Upcoming Birthdays")+'\n\n')
    print('\n[us38] Upcoming Birthdays')
    print( us38 )

    us39 = hdUserStories.us39(GEDCOM_dict)
    with open(outputFile, 'a+') as output:
        output.write("[us39] - List Upcoming Anniversaries\n")
        output.write(us39.get_string(title="[us39] - List Upcoming Anniversaries")+'\n\n')
    print('\n[us39] List Upcoming Anniversaries in the next 30 days')
    print( us39 )

    return

def main(fileName, GEDCOM_dict):

    # Case when the Program is Run Directly from Command Line and on an Valid Input File (Sanitized GEDCOM File from 1_sanitizedGEDCOM.py)
    if ( fileName.endswith('_dict.json') ):
        # READ FROM JSON DATA
        with open( fileName ) as GEDCOM_JSON:
            GEDCOM_dict = json.loads( GEDCOM_JSON.read() )

        displayEnhancements( fileName, GEDCOM_dict )

        return
    # Case when the Program is run from 0_main.py
    else:
        if ( len(GEDCOM_dict) != 0 ):
            displayEnhancements( fileName, GEDCOM_dict )

            return
        else:
            raise 'Empty Input, no GEDCOM Dictionary Data to Display'

    return


if __name__ == '__main__':
    main(sys.argv[1], {})
