myString = "Software engineers shall ensure that their products meet the highest"
myStringArray = myString.lower().split()

def addAy(list):
    list.append("ay")
    c = str("".join(list))
    print(c, end = " ")

def checkVowel(list):
    if list[0] == "a" or list[0] == "i" or list[0] == "e" or list[0] == "o" or list[0] == "u":
        return True
    else:
        return False
    
def checkOtherVowel(list):
    list = list[1:] + [list[0]]
    if checkVowel(list):
        addAy(list)
    else:
         checkOtherVowel(list)

for c in myStringArray:
    cL = list(c)
    if checkVowel(cL):
        cL.append("w")
        addAy(cL)
        
    else:
        checkOtherVowel(cL)
