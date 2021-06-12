import hashlib

TARGET = "99fd8438ac462a882d672be697f4615b59028ffc0eb67bead486fd94e076e2dc"

def check_hash(domain):
    readable_hash = hashlib.sha256(domain.encode()).hexdigest()
    return readable_hash

def clean_data(input_file):
    lines = input_file.split("\n")
    valid = []
    for line in lines:
        if "name = " in line:
            valid.append(line.split(" ")[-1])
    return valid

if __name__ == '__main__':
    input_file = open("outfile.txt", "r").read()
    clean_input = clean_data(input_file)

    for domain in clean_input:
        new_hash = check_hash(domain)
        if new_hash == TARGET:
            print(domain, new_hash)