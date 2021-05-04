# /*******************************************************************************
#  Name			: Gil Gerard Austria
#  Author		: Gil Gerard Austria
#  Date			: 2019-05-30 20:30:25
#  Description	: Project 02
#  Pledge		:"I pledge my honor that I have abided by the Stevens Honor System"	- Gil Gerard Austria
#  *******************************************************************************/

# Order of Checks
#   Check that level is between 0 and 2, inclusive: 0 <= level <= 2
#   Check that the tag is a valid, recognized tag in general: check if in keys of validTagLevelPairs
#       If the tag is INDI or FAM, make sure that the order is 0 <id> INDI/FAM
#   Check that the tag-level Pair is valid: Use the validTagLevelPairs Dict

import sys

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


def formatString(level, tag, validity, arguments):
    return str(level) + "|" + str(tag) + "|" + str(validity) + "|" + str(arguments)


def validate(line):
    lineSplit = line.split()

    # Parse Out Level and convert to int
    level = int(lineSplit[0])

    if (level == 0):    # Special Case because we need to parse INDI/FAM tags differently
        if(lineSplit[1] in uniqueTags):
            # Case where INDI/FAM tag appear in the wrong order
            return formatString(level, lineSplit[1], "N", " ".join(lineSplit[2:]))
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
            return formatString(level, lineSplit[2], "N", lineSplit[1])
        # Default case for a normal tag and level
        tag = lineSplit[1]
        arguments = " ".join(lineSplit[2:])

    # Case where level is not in between 0 and 2, inclusive
    if (level < 0 or level > 2):
        return formatString(level, tag, "N", arguments)
    # Case where parsed tag is not a valid tag that should be recognized by our program
    if (tag not in validTagLevelPairs.keys()):
        return formatString(level, tag, "N", arguments)
    # Case where tag does not appear
    if (validTagLevelPairs[tag] != level):
        return formatString(level, tag, "N", arguments)

    return formatString(level, tag, "Y", arguments)


def main(fileName):
    output = open(fileName[:-4]+'_output.txt', 'w+')
    inputFile = open(fileName, 'r')

    for line in inputFile:
        output.write('--> ' + line.rstrip() + "\n")
        output.write('<-- ' + validate(line) + "\n")
    return


if __name__ == '__main__':
    main(sys.argv[1])
