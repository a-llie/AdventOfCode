import itertools


def ImportFile(r):
    f = open(r, 'r')
    data = dict()
    for _ in f.read().split('\n'):
        data[_.split(':')[0]] = dict()
        for __ in _.split(': ')[1].split(', '):
            data[_.split(':')[0]][__.split(' ')[0]] = __.split(' ')[1]

    return data


def P1(data, diet=False):
    perms = list(itertools.combinations_with_replacement(data.keys(), 100))
    if diet:
        perms = Diet(data, perms)
    keys = list(data.keys())
    max = 0
    for _ in perms:
        counts = dict()
        total = 1
        for i in range(len(keys)):
            counts[keys[i]] = _.count(keys[i])

        for ingrdnt in data[keys[i]].keys():
            if ingrdnt == 'calories':
                continue
            sum = 0
            for l in counts.keys():
                sum += int(data[l][ingrdnt]) * counts[l]
            if sum > 0:
                total *= sum
            else:
                total *= 0
        if total > max:
            max = total

    return max


def Diet(data, perms):
    keys = list(data.keys())
    r_perms = []
    for _ in perms:
        counts = dict()
        for i in range(len(keys)):
            counts[keys[i]] = _.count(keys[i])
        calories = 0
        for i in counts.keys():
            calories += int(data[i]['calories']) * counts[i]

        if calories == 500:
            r_perms.append(_)
    return r_perms


data = ImportFile('text.txt')
print(P1(data))
print(P1(data, True))
