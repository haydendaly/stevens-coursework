# /*******************************************************************************
#  Author		: Gil Gerard Austria, Justin Bernstein, Hayden Daly
#  Date			: 2019-06-09
#  Version      : Sprint.02.Proj.06
#  Description	: Creates a New Txt ( {filename}_parse.txt ) with line by line feedback showing if a Line is Valid or Not
#                 Creates a New GEDCOM ( {filename}_sanitized.ged ) with Only GEDCOM Data from Valid Lines
#                 Returns a List of the Formatted Valid Lines
#  Github       : https://github.com/haydendaly/GEDCOM-Parser
#  Pledge		:"I pledge my honor that I have abided by the Stevens Honor System"	- Gil Gerard Austria, Justin Bernstein, Hayden Daly
#  *******************************************************************************/

import sys

def validate(line):
    validTagLevelPairs = {
        'INDI': 0,
        'FAM': 0,
        'HEAD': 0,
        'TRLR': 0,
        'NOTE': 0,
        'NAME': 1,
        'SEX': 1,
        'BIRT': 1,
        'DEAT': 1,
        'FAMC': 1,
        'FAMS': 1,
        'MARR': 1,
        'HUSB': 1,
        'WIFE': 1,
        'CHIL': 1,
        'DIV': 1,
        'DATE': 2
    }

    uniqueTags = ['INDI', 'FAM']

    lineSplit = line.split()

    # Parse Out Level and convert to int
    level = int(lineSplit[0])

    if (level == 0):    # Special Case because we need to parse INDI/FAM tags differently
        if(lineSplit[1] in uniqueTags):
            # Case where INDI/FAM tag appear in the wrong order
            return f'{level} | {lineSplit[1]} | N | ' + " ".join(lineSplit[2:])
        else:
            # Case of a Correctly Ordered INDI/FAM tag
            if (len(lineSplit) >= 3 and lineSplit[2] in uniqueTags):
                tag = lineSplit[2]
                arguments = lineSplit[1]
            else:   # Case of a Correctly Ordered HEAD, NOTE, or TRLR tag
                tag = lineSplit[1]
                arguments = " ".join(lineSplit[2:])
    # Else Case of a Correctly Ordered level 1 or level 2 tags (there are no tags in level 1 or 2 that differ from the <level> <tag> <args> format)
    else:
        # Case where the INDI/FAM tag is formatted correctly but has the wrong level
        if (len(lineSplit) >= 3 and lineSplit[2] in uniqueTags):
            return f'{level} | {lineSplit[2]} | N | {lineSplit[1]}'
        # Default case for a normal tag and level
        tag = lineSplit[1]
        arguments = " ".join(lineSplit[2:])

    # Case where level is not in between 0 and 2, inclusive
    if (level < 0 or level > 2):
        return f'{level} | {tag} | N | {arguments}'
    # Case where parsed tag is not a valid tag that should be recognized by our program
    if (tag not in validTagLevelPairs.keys()):
        return f'{level} | {tag} | N | {arguments}'
    # Case where tag does not appear
    if (validTagLevelPairs[tag] != level):
        return f'{level} | {tag} | N | {arguments}'

    return f'{level} | {tag} | Y | {arguments}'


def main(fileName):
    parse = open(fileName[:-4] + '_parse.txt', 'w+')
    sanitize = open(fileName[:-4] + '_sanitized.ged', 'w+')
    inputFile = open(fileName, 'r')

    validLinesList = []
    lineCounter = 1

    for line in inputFile:
        parse.write('--> ' + line.rstrip() + "\n")
        lineValidation = validate(line)
        parse.write('<-- ' + lineValidation + "\n")

        lineValidationSplit = lineValidation.split(" | ")
        valid = lineValidationSplit[2]
        if ( str(valid) == "Y" ):
            sanitize.write(lineValidation + " | " + str(lineCounter) + "\n")
            validLinesList.append(lineValidation + " | " + str(lineCounter) )
        lineCounter = lineCounter + 1


    return validLinesList


if __name__ == '__main__':
    main(sys.argv[1])
