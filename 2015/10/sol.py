import sys
sys.set_int_max_str_digits(0)


def ImportFile(r):
    f = open(r, 'r')
    return f.read()


def change_line(line):
    string = ""
    prev = line[0]
    same = 1
    for i in range(1, len(line)):
        curr = line[i]
        if curr == prev:
            same += 1
        else:
            string += str(same) + str(prev)
            same = 1
        prev = curr

    string += str(same) + str(prev)
    return string


line = ImportFile('text.txt')

for i in range(40):
    line = change_line(line)

print(len(line))
