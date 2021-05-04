# /*******************************************************************************
#  Author		: Gil Gerard Austria, Justin Bernstein, Hayden Daly
#  Date			: 2019-06-09
#  Version      : Sprint.02.Proj.06
#  Description	: Parses Dictionary Data to Output All Family Data
#                 Creates/Appends to Txt file ( {fileName}_output.txt )
#                 Returns Table with Family Data
#  Github       : https://github.com/haydendaly/GEDCOM-Parser
#  Pledge		:"I pledge my honor that I have abided by the Stevens Honor System"	- Gil Gerard Austria, Justin Bernstein, Hayden Daly
#  *******************************************************************************/

# Built-in Python Modules
import sys
import json

# Non-Built-In Python Modules that Need to be Installed
from prettytable import PrettyTable
from natsort import natsorted

def displayFamilyData(individualData, familyData):

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

    famDataTable = PrettyTable()
    famDataTable.field_names = ["ID", "Married", "Divorced", "Husband ID", "Husband Name", "Wife ID", "Wife Name", "Children"]

    idListSorted = natsorted( familyData.keys() )

    for id in idListSorted:
        famData = familyData[id]

        # Format Married Date
        marriedDate = famData['MARR']

        if ( marriedDate != 'N/A' ):
            marriedDateSplit = marriedDate.split(" ")
            married = marriedDateSplit[2] + '-' + monthToNumDict[ marriedDateSplit[1] ] + '-' + marriedDateSplit[0].zfill(2)
            famData['MARR'] = married
        else:
            married = 'N/A'

        # Check if Divorced and Format Death Date
        divorcedDate = famData['DIV']
        if ( divorcedDate != 'N/A' ):
            divorcedDateSplit = divorcedDate.split(" ")
            divorced = divorcedDateSplit[2] + '-' + monthToNumDict[ marriedDateSplit[1] ] + '-' + marriedDateSplit[0].zfill(2)
            famData['DIV'] = divorced
        else:
            divorced = 'N/A'

        # Get Husband Data
        husbandId = famData['HUSB']
        if ( husbandId != 'N/A' ):
            husbandName = individualData[husbandId].get('NAME')
            famData['HUSB_NAME'] = husbandName

        # Get Wife Data
        wifeId = famData['WIFE']
        if ( wifeId != 'N/A' ):
            wifeName = individualData[wifeId].get('NAME')
            famData['WIFE_NAME'] = wifeName

        # Check if Children Exist and Format Data

        if ( famData['CHIL'] == 'N/A' ):
            children = 'None'
        elif ( len( famData['CHIL'] ) == 1 ):
            children = '{\'' + "".join( famData['CHIL'] ) + '\'}'
        else:
            children = '{\'' + "\', \'".join( famData['CHIL'] ) + '\'}'


        famDataTable.add_row([id, married, divorced, husbandId, husbandName, wifeId, wifeName, children])

    return famDataTable

def main(fileName, GEDCOM_dict):

    # Case when the Program is Run Directly from Command Line and on an Valid Input File (Sanitized GEDCOM File from 1_sanitizedGEDCOM.py)
    if ( fileName.endswith('_dict.json') ):
        # READ FROM JSON DATA
        with open( fileName ) as GEDCOM_JSON:
            GEDCOM_dict = json.loads( GEDCOM_JSON.read() )

        familyDataTable = displayFamilyData( GEDCOM_dict['individualData'], GEDCOM_dict['familyData'] )

        with open(fileName.rstrip('_dict.json') + '_output.txt', 'a+') as output:
            output.write("Families\n")
            output.write(familyDataTable.get_string(title="Families")+'\n\n')

        # Overwrite GEDCOM Created in 2_storeGEDCOMInDict.py with Data Matching Exactly what is Printed out in the Tables
        with open(fileName[:-4] + '_dict.json', 'w', encoding='utf-8') as outfile:
            json.dump(GEDCOM_dict, outfile, ensure_ascii=False, indent=2)

        return familyDataTable
    # Case when the Program is run from 0_main.py
    else:
        if ( len(GEDCOM_dict) != 0 ):
            familyDataTable = displayFamilyData( GEDCOM_dict['individualData'], GEDCOM_dict['familyData'] )

            with open(fileName[:-4] + '_output.txt', 'a+') as output:
                output.write("Families\n")
                output.write(familyDataTable.get_string(title="Families")+'\n\n')

            # Overwrite GEDCOM Created in 2_storeGEDCOMInDict.py with Data Matching Exactly what is Printed out in the Tables
            with open(fileName[:-4] + '_dict.json', 'w', encoding='utf-8') as outfile:
                json.dump(GEDCOM_dict, outfile, ensure_ascii=False, indent=2)

            return familyDataTable
        else:
            raise 'Empty Input, no GEDCOM Dictionary Data to Display'

    return


if __name__ == '__main__':
    main(sys.argv[1], {})
