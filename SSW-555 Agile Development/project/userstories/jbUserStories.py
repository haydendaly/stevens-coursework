import datetime
from prettytable import PrettyTable

# Checks that Dates (birth, marriage, divorce, death) are not after the current date
def us01(GEDCOM_dict):

    invalidIndiDateTable = PrettyTable()
    invalidIndiDateTable.field_names = ['ID', 'Name', 'Date Tag', 'Date', '[US40] Line Number']

    for key, value in GEDCOM_dict['individualData'].items():
        today = datetime.datetime.now()
        if ( value['BIRT'] != 'N/A' ):
            if datetime.datetime.strptime(" ".join( value['BIRT'].split('-') ), '%Y %m %d') > today:
                invalidIndiDateTable.add_row([key, value['NAME'], 'BIRT', value['BIRT'], value['BIRTLine']])
        if ( value['DEAT'] != 'N/A' ):
            if datetime.datetime.strptime(" ".join( value['DEAT'].split('-') ), '%Y %m %d') > today:
                invalidIndiDateTable.add_row([key, value['NAME'], 'DEAT', value['DEAT'], value['DEATLine']])

    invalidFamDateTable = PrettyTable()
    invalidFamDateTable.field_names = ['FAM ID', 'Date Tag', 'Date', '[US40] Line Number']
    for key, value in GEDCOM_dict['familyData'].items():
        today = datetime.datetime.now()
        if ( value['MARR'] != 'N/A' ):
            if datetime.datetime.strptime(" ".join( value['MARR'].split('-') ), '%Y %m %d') > today:
                invalidFamDateTable.add_row([key, 'MARR', value['MARR'], value['MARRLine']])
        if ( value['DIV'] != 'N/A' ):
            if datetime.datetime.strptime(" ".join( value['DIV'].split('-') ), '%Y %m %d') > today:
                invalidFamDateTable.add_row([key, 'DIV', value['DIV'], value['DIVLine']])

    return { 'invalidIndiDates' : invalidIndiDateTable.get_string(), 'invalidFamDates' : invalidFamDateTable.get_string() }

# Checks that Birth occur before marriage of an individual
def us02(GEDCOM_dict):

    invalidDateTable = PrettyTable()
    invalidDateTable.field_names = ['FAM ID', 'Married', 'Husband ID', 'Husband Name', 'Husband Birthday', 'Wife ID', 'Wife Name', 'Wife Birthday', '[US40] Line Number']

    familyData = GEDCOM_dict['familyData']
    individualData = GEDCOM_dict['individualData']
    for key, value in familyData.items():
        if ( value['MARR'] != 'N/A' ):
            # Checks that the Husband's and Wife's Marriage Date does not occur before their respective birthdays
            marr_date = datetime.datetime.strptime(" ".join( value['MARR'].split('-') ), '%Y %m %d')
            if ( individualData[value['HUSB']]['BIRT'] != 'N/A' ):
                husb_birt = datetime.datetime.strptime(" ".join( individualData[value['HUSB']]['BIRT'].split('-') ), '%Y %m %d')
            else:
                husb_birt = datetime.datetime.min

            if ( individualData[value['WIFE']]['BIRT'] != 'N/A' ):
                wife_birt = datetime.datetime.strptime(" ".join( individualData[value['WIFE']]['BIRT'].split('-') ), '%Y %m %d')
            else:
                wife_birt = datetime.datetime.min

            if ( husb_birt >= marr_date or wife_birt >= marr_date ):
                invalidDateTable.add_row( [ key, value['MARR'], value['HUSB'], value['HUSB_NAME'], individualData[value['HUSB']]['BIRT'], value['WIFE'], value['WIFE_NAME'], individualData[value['WIFE']]['BIRT'], value['MARRLine'] ] )

    return invalidDateTable

# Marriage should occur before divorce of spouses, and divorce can only occur after marriage
def us04(GEDCOM_dict):
    invalidDateTable = PrettyTable()
    invalidDateTable.field_names = ['FAM ID', 'Married', 'Divorced', 'Husband ID', 'Husband Name', 'Wife ID', 'Wife Name', '[US40] Line Number']

    familyData = GEDCOM_dict['familyData']
    for key, value in familyData.items():
        if ( value['MARR'] != 'N/A' ):
            if value['DIV'] != 'N/A':
                if datetime.datetime.strptime(" ".join( value['MARR'].split('-') ), '%Y %m %d') > datetime.datetime.strptime(" ".join( value['DIV'].split('-') ), '%Y %m %d'):
                    invalidDateTable.add_row([ key, value['MARR'], value['DIV'], value['HUSB'], value['HUSB_NAME'], value['WIFE'], value['WIFE_NAME'], value['DIVLine']])
    return invalidDateTable

# Marriage should occur before death of either spouse
def us05(GEDCOM_dict):
    invalidDateTable = PrettyTable()
    invalidDateTable.field_names = ['FAM ID', 'Married', 'Husband ID', 'Husband Name', 'Husband Death', 'Wife ID', 'Wife Name', 'Wife Death', '[US40] Line Number']

    familyData = GEDCOM_dict['familyData']
    individualData = GEDCOM_dict['individualData']
    for key, value in familyData.items():
        if ( value['MARR'] != 'N/A' ):
            marr_date = datetime.datetime.strptime(" ".join( value['MARR'].split('-') ), '%Y %m %d')
            if (individualData[value['HUSB']]['DEAT'] != 'N/A'):
                husb_deat = datetime.datetime.strptime(" ".join( individualData[value['HUSB']]['DEAT'].split('-') ), '%Y %m %d')
            else:
                husb_deat = datetime.datetime.min

            if (individualData[value['WIFE']]['DEAT'] != 'N/A'):
                wife_deat = datetime.datetime.strptime(" ".join( individualData[value['WIFE']]['DEAT'].split('-') ), '%Y %m %d')
            else:
                wife_deat = datetime.datetime.min

            if (husb_deat >= marr_date or wife_deat >= marr_date):
                    invalidDateTable.add_row([ key, value['MARR'], value['HUSB'], value['HUSB_NAME'], husb_deat.date(), value['WIFE'], value['WIFE_NAME'], wife_deat.date(), value['MARRLine']])
    return invalidDateTable

# Checks that Birth occur before death of an individual
def us03(GEDCOM_dict):

    invalidDateTable = PrettyTable()
    invalidDateTable.field_names = ['ID', 'Name', 'Birth', 'Death']

    individualData = GEDCOM_dict['individualData']
    for key, value in individualData.items():
        if ( value['DEAT'] != 'N/A' ):
            deat = datetime.datetime.strptime(" ".join( value['DEAT'].split('-') ), '%Y %m %d')
        else:
            deat = datetime.datetime.min
        if ( value['BIRT'] != 'N/A' ):
                birt = datetime.datetime.strptime(" ".join( value['BIRT'].split('-') ), '%Y %m %d')
        else:
            birt = datetime.datetime.min
        if ( birt >= deat and deat != datetime.datetime.min):
            invalidDateTable.add_row( [ key, value['NAME'], value['BIRT'], value['DEAT'] ] )

    return invalidDateTable

# Birth should occur before death of parents
def us09(GEDCOM_dict):
    invalidDateTable = PrettyTable()
    invalidDateTable.field_names = ['FAM ID', 'Child ID', 'Child Name', 'Child Birth', 'Husband ID', 'Husband Name', 'Husband Death', 'Wife ID', 'Wife Name', 'Wife Death']

    familyData = GEDCOM_dict['familyData']
    individualData = GEDCOM_dict['individualData']
    for key, value in familyData.items():
        if ( value['CHIL'] == 'N/A' ):
            break
        if ( individualData[value['HUSB']]['DEAT'] != 'N/A'):
            husb_deat = datetime.datetime.strptime(" ".join( individualData[value['HUSB']]['DEAT'].split('-') ), '%Y %m %d')
        else:
            husb_deat = datetime.datetime.min

        if (individualData[value['WIFE']]['DEAT'] != 'N/A'):
            wife_deat = datetime.datetime.strptime(" ".join( individualData[value['WIFE']]['DEAT'].split('-') ), '%Y %m %d')
        else:
            wife_deat = datetime.datetime.min
        for i in range(len(value['CHIL'])):
            chil_birt = datetime.datetime.strptime(" ".join( individualData[value['CHIL'][i]]['BIRT'].split('-') ), '%Y %m %d')
            if ((husb_deat.date() <= (chil_birt.date() + datetime.timedelta(9*365/12))) or wife_deat.date() <= chil_birt.date()):
                invalidDateTable.add_row([ key, value['CHIL'][i], individualData[value['CHIL'][i]]['NAME'], individualData[value['CHIL'][i]]['BIRT'],value['HUSB'], value['HUSB_NAME'], husb_deat.date(), value['WIFE'], value['WIFE_NAME'], wife_deat.date()])
    return invalidDateTable

# Children should be born after marriage of parents (and not more than 9 months after their divorce)
def us08(GEDCOM_dict):
    invalidDateTable = PrettyTable()
    invalidDateTable.field_names = ['FAM ID', 'Child ID', 'Child Name', 'Child Birth', 'Married']

    familyData = GEDCOM_dict['familyData']
    individualData = GEDCOM_dict['individualData']
    for key, value in familyData.items():
        if ( value['CHIL'] == 'N/A' ):
            break
        if ( value['MARR'] != 'N/A'):
            marr_date = datetime.datetime.strptime(" ".join( value['MARR'].split('-') ), '%Y %m %d')
            if ( value['DIV'] != 'N/A'):
                div_date = datetime.datetime.strptime(" ".join( value['DIV'].split('-') ), '%Y %m %d')
            else:
                div_date = datetime.datetime.min
        else:
            marr_date = datetime.datetime.min

        if (individualData[value['CHIL']]['BIRT'] != 'N/A'):
            chil_birt = datetime.datetime.strptime(" ".join( individualData[value['CHIL']]['BIRT'].split('-') ), '%Y %m %d')
        else:
            chil_birt = datetime.datetime.min
        # for i in range(len(value['CHIL'])):
        #     chil_birt = datetime.datetime.strptime(" ".join( individualData[value['CHIL'][i]]['BIRT'].split('-') ), '%Y %m %d')
        #     if ((husb_deat.date() <= (chil_birt.date() + datetime.timedelta(9*365/12))) or wife_deat.date() <= chil_birt.date()):
        if ((div_date.date() <= (chil_birt.date() + datetime.timedelta(9*365/12))) or marr_date.date() <= chil_birt.date()):
            invalidDateTable.add_row([ key, value['CHIL'], individualData[value['CHIL']]['NAME'], individualData[value['CHIL']]['BIRT'], marr_date.date()])
    return invalidDateTable

# Mother should be less than 60 years older than her children and father should be less than 80 years older than his children
def us12(GEDCOM_dict):
    invalidDateTable = PrettyTable()
    invalidDateTable.field_names = ['FAM ID', 'Child ID', 'Child Name', 'Child Birth', 'Husband ID', 'Husband Name', 'Husband Birth', 'Wife ID', 'Wife Name', 'Wife Birth']

    familyData = GEDCOM_dict['familyData']
    individualData = GEDCOM_dict['individualData']
    for key, value in familyData.items():
        if ( value['CHIL'] == 'N/A' ):
            break
        if ( individualData[value['HUSB']]['BIRT'] != 'N/A'):
            husb_birt = datetime.datetime.strptime(" ".join( individualData[value['HUSB']]['BIRT'].split('-') ), '%Y %m %d')
        else:
            husb_birt = datetime.datetime.min
        if ( individualData[value['WIFE']]['BIRT'] != 'N/A'):
            wife_birt = datetime.datetime.strptime(" ".join( individualData[value['WIFE']]['BIRT'].split('-') ), '%Y %m %d')
        else:
            wife_birt = datetime.datetime.min
        if (individualData[value['CHIL']]['BIRT'] != 'N/A'):
            chil_birt = datetime.datetime.strptime(" ".join( individualData[value['CHIL']]['BIRT'].split('-') ), '%Y %m %d')
        else:
            chil_birt = datetime.datetime.min
        if ((wife_birt.date() <= (chil_birt.date() + datetime.timedelta(60*365))) or husb_birt.date() <= (chil_birt.date() + datetime.timedelta(80*365))):
            invalidDateTable.add_row([ key, value['CHIL'], individualData[value['CHIL']]['NAME'], individualData[value['CHIL']]['BIRT'], value['HUSB'], value['HUSB_NAME'], husb_birt.date(), value['WIFE'], value['WIFE_NAME'], wife_birt.date()])
    return invalidDateTable
