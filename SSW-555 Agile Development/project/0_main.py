# /*******************************************************************************
#  Author		: Gil Gerard Austria, Justin Bernstein, Hayden Daly
#  Date			: 2019-06-09
#  Version      : Sprint.02.Proj.06
#  Description	: GEDCOM File Parser and Validator
#  Github       : https://github.com/haydendaly/GEDCOM-Parser
#  Pledge		:"I pledge my honor that I have abided by the Stevens Honor System"	- Gil Gerard Austria, Justin Bernstein, Hayden Daly
#  *******************************************************************************/

import sys

sanitizeGEDCOM = __import__('1_sanitizeGEDCOM')
storeGEDCOMInDict = __import__('2_storeGEDCOMInDict')
displayIndividualData = __import__('3_displayIndividualData')
displayFamilyData = __import__('3_displayFamilyData')
displayAnomalies = __import__('4_displayAnomalies')
displayErrors = __import__('4_displayErrors')
displayEnhancements = __import__('4_displayEnhancements')


def main(fileName):

    # Check that Required Packages are Installed
    requirements = open( 'requirements.txt', 'r')
    for package in requirements:
        try:
            packageName = package.strip()
            tryImport = __import__(packageName)
        except ModuleNotFoundError as e:
            print(e)
            print('Please Install Package before Running Program')
            sys.exit(1)
    requirements.close()


    validLinesList = sanitizeGEDCOM.main(fileName)

    GEDCOM_dict = storeGEDCOMInDict.main( fileName, validLinesList )

    print('Individuals')
    print( displayIndividualData.main( fileName, GEDCOM_dict ) )    # Modifies the GEDCOM Dict to Match What is Printed
    print('Families')
    print( displayFamilyData.main( fileName, GEDCOM_dict ) )    # Modifies the GEDCOM Dict to Match What is Printed

    # Every Function After This Line will be using a GEDCOM_dict modified by displayIndividualData and displayFamilyData

    displayAnomalies.main( fileName, GEDCOM_dict )
    displayErrors.main( fileName, GEDCOM_dict )
    displayEnhancements.main( fileName, GEDCOM_dict)

    return


if __name__ == '__main__':
    main(sys.argv[1])
