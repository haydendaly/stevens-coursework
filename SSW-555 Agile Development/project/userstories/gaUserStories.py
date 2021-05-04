# /*******************************************************************************
#  Name			: Gil Gerard Austria
#  Author		: Gil Gerard Austria
#  Date			: 2019-06-24
#  Description	: Project 04 -  Sprint 1
#  Pledge		:"I pledge my honor that I have abided by the Stevens Honor System"	- Gil Gerard Austria
#  *******************************************************************************/

import datetime

from prettytable import PrettyTable
from natsort import natsorted

# ----------------------------------- Sprint 01 -----------------------------------
# List all upcoming birthdays
def us38(GEDCOM_dict):

    birthdayDict = {}   # Dict used to hold data to be passed into us_38 to find upcoming birthdays

    individualData = GEDCOM_dict['individualData']
    idListSorted = natsorted( individualData.keys() )

    for id in idListSorted:
        name = individualData[id]['NAME']
        alive = individualData[id]['ALIVE']
        birthday = individualData[id]['BIRT']
        if ( alive == 'True' ):
            birthdayDict[id] = { 'NAME' : name, 'BIRT' : birthday }
        else:
            continue

    upcomingBirthdayTable = PrettyTable()
    upcomingBirthdayTable.field_names = ["ID", "Name", "Birthday"]

    for id in birthdayDict:

        birthdate = str(birthdayDict[id].get('BIRT'))
        if ( birthdate != 'N/A' ):
            birthdateSplit = birthdate.split('-')
            birthMonth = int(birthdateSplit[1])
            birthDayDate = int(birthdateSplit[2])

            today = datetime.datetime.today()
            currentYear = today.year
            currentMonth = today.month
            currentDay = today.day

            birthdayThisYear = datetime.datetime( currentYear, birthMonth, birthDayDate )

            if ( birthdayThisYear > today and birthdayThisYear < today + datetime.timedelta(30) ):
                upcomingBirthdayTable.add_row([id, birthdayDict[id].get('NAME'), birthdayDict[id].get('BIRT')])

    return upcomingBirthdayTable


# Display Individual Age
def us27(birthday, death, alive):

    if ( birthday != 'N/A' and death != 'N/A' and alive == 'False'):  # Birth and Death Date are Known (alive == 'False')
        #do date arithmetic
        birthdateSplit = birthday.split('-')
        birthMonth = str(birthdateSplit[1])
        birthDayDate = str(birthdateSplit[2])
        birthYear = str(birthdateSplit[0])

        deathdateSplit = death.split('-')
        deathMonth = str(deathdateSplit[1])
        deathDayDate = str(deathdateSplit[2])
        deathYear = str(deathdateSplit[0])

        birthDate = birthYear + birthMonth + birthDayDate
        deathDate = deathYear + deathMonth + deathDayDate

        age = int(deathDate) - int(birthDate)

        if ( age < 0 ):
            return 'N/A'

        return str(age).zfill(7)[:-4].lstrip('0').zfill(1)


    if ( birthday != 'N/A' and death == 'N/A' and alive == 'True' ): # BirthDay is known and alive == 'True', no death date
        #do date arithmetic
        birthdateSplit = birthday.split('-')
        birthMonth = str(birthdateSplit[1])
        birthDayDate = str(birthdateSplit[2])
        birthYear = str(birthdateSplit[0])
        birthDate = birthYear + birthMonth + birthDayDate

        today = datetime.datetime.today()
        dateToday = str(today.year) + str(today.month).zfill(2) + str(today.day).zfill(2)

        age = int(dateToday) - int(birthDate)

        if ( age < 0 ):
            return 'N/A'

        return str(age).zfill(7)[:-4].lstrip('0').zfill(1)

    if ( birthday == 'N/A' ):
        # Cannot calculate age
        return 'N/A'

    return 'N/A'


# ----------------------------------- Sprint 02 -----------------------------------

# List all living married people in a GEDCOM file
def us30(GEDCOM_dict):

    livingMarriedTable = PrettyTable()
    livingMarriedTable.field_names = [ 'ID', 'Name' ]

    individualData = GEDCOM_dict['individualData']
    familyData = GEDCOM_dict['familyData']
    idListSorted = natsorted( individualData.keys() )

    for id in idListSorted:
        if ( individualData[id]['ALIVE'] == 'True' ):
            if ( individualData[id]['FAMS'] == 'N/A' ):
                continue
            else:
                fams = individualData[id]['FAMS']
                for famId in fams:
                    if ( familyData[ famId ]['DIV'] == 'N/A' ):
                        livingMarriedTable.add_row( [ id, individualData[id]['NAME'] ] )
                    else:
                        continue
        else:
            continue

    return livingMarriedTable

# List all living people over 30 who have never been married in a GEDCOM file
def us31(GEDCOM_dict):

    livingSingleTable = PrettyTable()
    livingSingleTable.field_names = [ 'ID', 'Name' ]

    individualData = GEDCOM_dict['individualData']
    idListSorted = natsorted( individualData.keys() )

    for id in idListSorted:
        if ( individualData[id]['ALIVE'] == 'True' ):
            if ( individualData[id]['FAMS'] == 'N/A' ):
                if ( individualData[id]['AGE'] != 'N/A' and int(individualData[id]['AGE']) >= 30 ):
                    livingSingleTable.add_row( [ id, individualData[id]['NAME'] ] )
                else:
                    continue
            else:
                continue
        else:
            continue

    return livingSingleTable


# ----------------------------------- Sprint 03 -----------------------------------
# Marriage should be at least 14 years after birth of both spouses (parents must be at least 14 years old)
def us10(GEDCOM_dict):

    marriedBefore14Table = PrettyTable()
    marriedBefore14Table.field_names = [ 'Fam ID', 'Marriage Date', 'ID', 'Name', 'Birthday', 'Age During Marriage' ]

    individualData = GEDCOM_dict['individualData']
    familyData = GEDCOM_dict['familyData']

    for famId in familyData:
        marr_date = familyData[famId]['MARR']
        if ( marr_date != 'N/A' ):

            marrdateSplit = marr_date.split('-')
            marrMonth = str(marrdateSplit[1])
            marrDayDate = str(marrdateSplit[2])
            marrYear = str(marrdateSplit[0])
            marrDate = marrYear + marrMonth + marrDayDate

            husbId = familyData[famId]['HUSB']
            wifeId = familyData[famId]['WIFE']
            husb_birthday = individualData[husbId]['BIRT'] if husbId != 'N/A' else 'N/A'
            husb_name = individualData[husbId]['NAME'] if husbId != 'N/A' else 'N/A'
            wife_birthday = individualData[wifeId]['BIRT'] if wifeId != 'N/A' else 'N/A'
            wife_name = individualData[wifeId]['NAME'] if wifeId != 'N/A' else 'N/A'

            if ( husb_birthday != 'N/A' ):
                husb_birthdateSplit = husb_birthday.split('-')
                husb_birthMonth = str(husb_birthdateSplit[1])
                husb_birthDayDate = str(husb_birthdateSplit[2])
                husb_birthYear = str(husb_birthdateSplit[0])

                husb_birthDate = husb_birthYear + husb_birthMonth + husb_birthDayDate

                age = int(marrDate) - int(husb_birthDate)

                if ( age < 0 ):
                    continue


                husb_age_at_marr = str(age).zfill(7)[:-4].lstrip('0').zfill(1)

                if ( int( husb_age_at_marr ) < 14 ):
                    marriedBefore14Table.add_row( [ famId, marr_date, husbId, husb_name, husb_birthday, husb_age_at_marr ] )
                else:
                    continue

            if ( wife_birthday != 'N/A' ):
                wife_birthdateSplit = wife_birthday.split('-')
                wife_birthMonth = str(wife_birthdateSplit[1])
                wife_birthDayDate = str(wife_birthdateSplit[2])
                wife_birthYear = str(wife_birthdateSplit[0])

                wife_birthDate = wife_birthYear + wife_birthMonth + wife_birthDayDate

                age = int(marrDate) - int(wife_birthDate)

                if ( age < 0 ):
                    continue

                wife_age_at_marr = str(age).zfill(7)[:-4].lstrip('0').zfill(1)

                if ( int( wife_age_at_marr ) < 14 ):
                    marriedBefore14Table.add_row( [ famId, marr_date, wifeId, wife_name, wife_birthday, wife_age_at_marr ] )
                else:
                    continue

        else:
            continue

    return marriedBefore14Table

# ----------------------------------- Sprint 04 -----------------------------------
# Include Partial Dates - Accept and use dates without days or without days and months
# -> Default Missing Days to 01; Default Missing Months to JAN
def us41( date ):
    dateSplit = date.split( " " )
    if ( len(dateSplit) < 3 ):
        if ( len(dateSplit) == 2 ): # Dates without days
            dateWithDefaultDay = f'01 {dateSplit[0]} {dateSplit[1]}'
            return dateWithDefaultDay
        if ( len(dateSplit) == 1 ): # Dates without days and months
            dateWithDefaultDayAndMonth = f'01 JAN {dateSplit[0]}'
            return dateWithDefaultDayAndMonth
    elif ( len(dateSplit) == 3 ):
        return date
    else:
        return 'N/A'

# Reject illegitimate dates - All dates should be legitimate dates for the months specified (e.g., 2/30/2015 is not legitimate)
def us42( date ):

    try:
        datetime.datetime.strptime( date, '%d %b %Y')
    except ValueError:
        return 'N/A'

    return date
