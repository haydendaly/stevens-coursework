import string
letters = list(string.ascii_lowercase)
values = list(range(1,27))
alphabet = dict(zip(letters, values))

def string_to_num(string):
    lst = list(string.lower())
    i = 0
    for x in lst:
        if x in letters:
            lst[i] = alphabet[x]
        else:
            lst[i] = x
        i += 1
    return lst

def num_to_string(lst):
    i = 0
    for x in lst:
        if type(x) == int:
            lst[i] = letters[(x-1)%26]
            i+=1
        else:
            lst[i] = x
            i+=1
    string = ''.join(str(i) for i in lst)
    return string

def decipher(string):
    lst = string_to_num(string)
    i = 0
    j = 5
    for x in lst:
        if type(x) == int:
            lst[i] = x - 2*int(i/3) - j
            i += 1
        else:
            lst[i] = x
            i += 1
    return num_to_string(lst)

def file(string):
    file = open(string)
    string = file.read()
    file.close()
    file = open("solution.txt", 'w')
    file.write(decipher(string))
    file.close

while True:
    string = input("What is the name of the textfile you want to decode?\n")
    file(string)
    print("Decoded!\n")
