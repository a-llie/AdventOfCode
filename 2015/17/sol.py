import itertools
v = 150


def ImportFile(r):
    f = open(r, 'r')
    data = dict()
    i = 0
    for _ in f.read().split('\n'):
        data[i] = int(_)
        i += 1

    return data


def P1(data):
    keys = list(data.keys())
    nums = dict()
    perms = list(itertools.combinations(keys, len(keys)))
    for i in range(1, len(keys) - 1):
        perms += list(itertools.combinations(keys, i))
    combos = 0
    for c in perms:
        sum = 0
        for e in c:
            sum += data[e]
        if sum == v:
            combos += 1
            if (not len(c) in nums.keys()):
                nums[len(c)] = 1
            else:
                nums[len(c)] += 1

    return (combos, nums[min(list(nums.keys()))])


data = ImportFile('text.txt')
result = P1(data)
print(result[0])
print(result[1])
