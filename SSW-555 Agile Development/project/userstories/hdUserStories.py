import datetime
import prettytable

# [Sprint02] List all deceased individuals in a GEDCOM file
def us29(GEDCOM_dict):

    deadTable = prettytable.PrettyTable()
    deadTable.field_names = ["ID", "Name"]

    for key, value in GEDCOM_dict['individualData'].items():
        if ( value['DEAT'] and value['DEAT'] != 'N/A' ):
            row = [key, value['NAME']]
            deadTable.add_row(row)

    return deadTable

# [Sprint01] List all people in a GEDCOM file who were born in the last 30 days
def us35(GEDCOM_dict):

    recentBirtTable = prettytable.PrettyTable()
    recentBirtTable.field_names = ['ID', 'Name', 'Birthday']

    for key, value in GEDCOM_dict['individualData'].items():
        if ( value['BIRT'] and value['BIRT'] != 'N/A' ):
            birthdate = datetime.datetime.strptime(" ".join( value['BIRT'].split('-') ), '%Y %m %d')
            today = datetime.datetime.now()

            if( birthdate >= today + datetime.timedelta(-30) and birthdate <= today ):
                row = [key, value['NAME'], value['BIRT']]
                recentBirtTable.add_row(row)

    return recentBirtTable

# [Sprint01] List all people in a GEDCOM file who died in the last 30 days
def us36(GEDCOM_dict):

    recentDeatTable = prettytable.PrettyTable()
    recentDeatTable.field_names = ["ID", "Name", "Death"]

    for key, value in GEDCOM_dict['individualData'].items():
        if ( value['DEAT'] and value['DEAT'] != 'N/A' ):
            deathdate = datetime.datetime.strptime(" ".join(value['DEAT'].split('-') ), '%Y %m %d')
            today = datetime.datetime.now()
            if( deathdate >= today + datetime.timedelta(-30) and deathdate <= today ):
                row = [key, value['NAME'], value['DEAT']]
                recentDeatTable.add_row(row)

    return recentDeatTable

# [Sprint02] List all living couples in a GEDCOM file whose marriage anniversaries occur in the next 30 days
def us39(GEDCOM_dict):

    upcomingAnniversariesTable = prettytable.PrettyTable()
    upcomingAnniversariesTable.field_names = ["Family ID", "Husband", "Wife", "Marriage Date"]

    for key, value in GEDCOM_dict['familyData'].items():
        if ( value['MARR'] and value['MARR'] != 'N/A' ):
            marriagedate = datetime.datetime.strptime(" ".join(value['MARR'].split('-') ), '%Y %m %d')
            marriagedate = marriagedate.replace(year=2019)
            today = datetime.datetime.now()

            if( marriagedate <= today + datetime.timedelta(30)) and marriagedate >= today:
                row = [key, value['HUSB_NAME'], value['WIFE_NAME'], value['MARR']]
                upcomingAnniversariesTable.add_row(row)

    return upcomingAnniversariesTable

def us06(GEDCOM_dict):

    divorceBeforeDeathTable = prettytable.PrettyTable()
    divorceBeforeDeathTable.field_names = ["Family ID", "Husband ID", "Husband", "Husband Death Date", "Wife ID", "Wife", "Wife Death Date", "Divorce Date"]

    familyData = GEDCOM_dict['familyData'].items()
    individualData = GEDCOM_dict['individualData']

    for key, value in familyData:

        if value['DIV'] != 'N/A' and value['HUSB'] != 'N/A' and value['WIFE'] != 'N/A':

            husbandDeathDate = individualData[value['HUSB']]['DEAT']
            wifeDeathDate = individualData[value['WIFE']]['DEAT']

            husbDate = datetime.datetime.strptime(" ".join('1800-01-01'.split('-') ), '%Y %m %d')
            wifeDate = husbDate

            if husbandDeathDate != 'N/A':
                husbDate = datetime.datetime.strptime(" ".join(husbandDeathDate.split('-') ), '%Y %m %d')
            if wifeDeathDate != 'N/A':
                wifeDate = datetime.datetime.strptime(" ".join(wifeDeathDate.split('-') ), '%Y %m %d')
            divDate = datetime.datetime.strptime(" ".join(value['DIV'].split('-') ), '%Y %m %d')
            if husbDate >= divDate or wifeDate >= divDate:
                row = [key, value['HUSB'], value['HUSB_NAME'], husbandDeathDate, value['WIFE'], value['WIFE_NAME'], wifeDeathDate, value['DIV']]
                divorceBeforeDeathTable.add_row(row)

    return divorceBeforeDeathTable

def us07(GEDCOM_dict):

    ageOver150Table = prettytable.PrettyTable()
    ageOver150Table.field_names = ["ID", "NAME", "AGE", "BIRTHDATE"]

    for key, value in GEDCOM_dict['individualData'].items():
        if value['AGE'] != 'N/A':
            if int(value['AGE']) >= 150:
                row = [key, value['NAME'], value['AGE'], value['BIRT']]
                ageOver150Table.add_row(row)

    return ageOver150Table

def us34(GEDCOM_dict):

    largeAgeDifferenceTable = prettytable.PrettyTable()
    largeAgeDifferenceTable.field_names = ["FAMILY ID", "AGE DIFFERENCE", "HUSB NAME", "HUSB AGE", "WIFE NAME", "WIFE AGE"]

    for key, value in GEDCOM_dict['familyData'].items():
        if(value['HUSB'] != 'N/A' and value['WIFE'] != 'N/A'):
            husbAge = GEDCOM_dict['individualData'][value['HUSB']]['AGE']
            wifeAge = GEDCOM_dict['individualData'][value['WIFE']]['AGE']
            if(husbAge != 'N/A' and wifeAge != 'N/A'):
                husbAge = int(husbAge)
                wifeAge = int(wifeAge)
                if (husbAge >= 2*wifeAge or wifeAge >= 2*husbAge):
                    row = [key, abs(husbAge - wifeAge), value['HUSB_NAME'], husbAge, value['WIFE_NAME'], wifeAge]
                    largeAgeDifferenceTable.add_row(row)

    return largeAgeDifferenceTable

def us21(GEDCOM_dict):

    incorrectGenderTable = prettytable.PrettyTable()
    incorrectGenderTable.field_names = ["FAMILY ID", "NAME", "ROLE", "GENDER" ]

    for key, value in GEDCOM_dict['familyData'].items():
        if(value['HUSB'] != 'N/A' and GEDCOM_dict['individualData'][value['HUSB']]['SEX'] != 'M'):
            row = [key, value['HUSB_NAME'], 'HUSB', GEDCOM_dict['individualData'][value['HUSB']]['SEX']]
            incorrectGenderTable.add_row(row)
        if(value['WIFE'] != 'N/A' and GEDCOM_dict['individualData'][value['WIFE']]['SEX'] != 'F'):
            row = [key, value['WIFE_NAME'], 'Wife', GEDCOM_dict['individualData'][value['WIFE']]['SEX']]
            incorrectGenderTable.add_row(row)

    return incorrectGenderTable
