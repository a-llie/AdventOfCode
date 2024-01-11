def ImportFile(fileName):
    return open(fileName, "r").read().split('\n')


def Count(data):
    count = 0
    for i in data:
        i = i.split(' ')
        i = [x for x in i if x != '']
        if (int(i[0]) + int(i[1]) > int(i[2])) and (int(i[0]) + int(i[2]) > int(i[1])) and (int(i[1]) + int(i[2]) > int(i[0])):
            count += 1

    return count


def Count_Vertical(data):
    count = 0
    for i in range(0, len(data), 3):
        r1 = data[i].split(' ')
        r1 = [x for x in r1 if x != '']
        r2 = data[i+1].split(' ')
        r2 = [x for x in r2 if x != '']
        r3 = data[i+2].split(' ')
        r3 = [x for x in r3 if x != '']
        for j in range(len(r1)):
            if (int(r1[j]) + int(r2[j]) > int(r3[j])) and (int(r1[j]) + int(r3[j]) > int(r2[j])) and (int(r2[j]) + int(r3[j]) > int(r1[j])):
                count += 1

    return count


data = ImportFile("text.txt")
print(Count(data))
print(Count_Vertical(data))
