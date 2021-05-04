# /*******************************************************************************
#  Author		: Gil Gerard Austria, Justin Bernstein, Hayden Daly
#  Date			: 2019-06-09
#  Version      : Sprint.02.Proj.06
#  Description	: Parses Dictionary Data to Output All Individual Data
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
from natsort import natsorted

# User Stories
from userstories import gaUserStories


def displayIndividualData(individualData):

    monthToNumDict = {
        'JAN': '01',
        'FEB': '02',
        'MAR': '03',
        'APR': '04',
        'MAY': '05',
        'JUN': '06',
        'JUL': '07',
        'AUG': '08',
        'SEP': '09',
        'OCT': '10',
        'NOV': '11',
        'DEC': '12'
    }

    indiDataTable = PrettyTable()
    indiDataTable.field_names = ["ID", "Name", "Gender", "Age", "Birthday", "Alive", "Death", "Child", "Spouse"]

    idListSorted = natsorted( individualData.keys() )

    for id in idListSorted:
        indiData = individualData[ id ]

        name = indiData['NAME']
        gender = indiData['SEX']

        if ( indiData['FAMC'] == 'N/A' ):
            child = 'N/A'
        else:
            child = '{\'' + indiData['FAMC'] + '\'}'

        if ( indiData['FAMS'] == 'N/A' ):
            spouse = 'N/A'
        elif ( len( indiData['FAMS'] ) == 1 ):
            spouse = '{\'' + "".join( indiData['FAMS'] ) + '\'}'
        else:
            spouse = '{\'' + "', '".join( indiData['FAMS'] ) + '\'}'

        birthdate = indiData['BIRT']
        if (birthdate != 'N/A' ):
            birthdateSplit = birthdate.split(" ")
            birthday = birthdateSplit[2] + '-' + monthToNumDict[ birthdateSplit[1] ] + '-' + birthdateSplit[0].zfill(2)
            indiData['BIRT'] = birthday
        else:
            birthday = 'N/A'

        deathdate = indiData['DEAT']
        if ( deathdate != 'N/A' ):
            indiData['ALIVE'] = 'False'
            alive = 'False'
            deathdateSplit = deathdate.split(" ")
            death = deathdateSplit[2] + '-' + monthToNumDict[ deathdateSplit[1] ] + '-' + deathdateSplit[0]
            indiData['DEAT'] = death
        else:
            indiData['ALIVE'] = 'True'
            alive = 'True'
            death = 'N/A'

        age = gaUserStories.us27(birthday, death, alive)
        indiData['AGE'] = age

        indiDataTable.add_row([id, name, gender, age, birthday, alive, death, child, spouse])

    return indiDataTable


def main(fileName, GEDCOM_dict):

    # Case when the Program is Run Directly from Command Line and on an Valid Input File (Sanitized GEDCOM File from 1_sanitizedGEDCOM.py)
    if ( fileName.endswith('_dict.json') ):
        # READ FROM JSON DATA
        with open( fileName ) as GEDCOM_JSON:
            GEDCOM_dict = json.loads( GEDCOM_JSON.read() )

        individualDataTable = displayIndividualData( GEDCOM_dict['individualData'] )

        with open(fileName.rstrip('_dict.json') + '_output.txt', 'a+') as output:
            output.write("Individuals (with us_27)\n")
            output.write(individualDataTable.get_string(title="Individuals (with us_27)")+'\n\n')

        # Overwrite GEDCOM Created in 2_storeGEDCOMInDict.py with Data Matching Exactly what is Printed out in the Tables
        with open(fileName[:-4] + '_dict.json', 'w', encoding='utf-8') as outfile:
            json.dump(GEDCOM_dict, outfile, ensure_ascii=False, indent=2)

        return individualDataTable
    # Case when the Program is run from 0_main.py
    else:
        if ( len(GEDCOM_dict) != 0 ):
            individualDataTable = displayIndividualData( GEDCOM_dict['individualData'] )

            with open(fileName[:-4] + '_output.txt', 'a+') as output:
                output.write("Individuals (with us_27)\n")
                output.write(individualDataTable.get_string(title="Individuals (with us_27)")+'\n\n')

            # Overwrite GEDCOM Created in 2_storeGEDCOMInDict.py with Data Matching Exactly what is Printed out in the Tables
            with open(fileName[:-4] + '_dict.json', 'w', encoding='utf-8') as outfile:
                json.dump(GEDCOM_dict, outfile, ensure_ascii=False, indent=2)

            return individualDataTable
        else:
            raise 'Empty Input, no GEDCOM Dictionary Data to Display'

    return


if __name__ == '__main__':
    main(sys.argv[1], {})
