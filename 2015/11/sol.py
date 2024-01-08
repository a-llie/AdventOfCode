import copy


def ImportFile(r):
    f = open(r, 'r')
    return f.read()


def increment(p):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    tc = p[len(p) - 1]
    p = list(p)
    offset = 0
    while (tc == alphabet[len(alphabet) - 1]):
        p[len(p) - 1 - offset] = alphabet[0]
        offset += 1
        tc = p[len(p) - 1 - offset]

    p[len(p) - 1 - offset] = alphabet[alphabet.index(tc) + 1]
    p = ''.join(p)

    return p


def valid(p):
    ac = ['abc', 'bcd', 'cde', 'def', 'efg', 'fgh', 'pqr', 'qrs',
          'rst', 'stu', 'tuv', 'uvw', 'vwx', 'wxy', 'xyz']
    db = ['aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg', 'hh', 'jj', 'kk', 'mm',
          'nn', 'pp', 'qq', 'rr', 'ss', 'tt', 'uu', 'vv', 'ww', 'xx', 'yy', 'zz']
    fb = ['i', 'o', 'l']
    if (not any(x in p for x in ac)):
        return False
    if (any(x in p for x in fb)):
        return False

    pc = copy.deepcopy(p)
    in_str = []
    for _ in db:
        if (_ in pc):
            in_str.append(_)
            pc = pc.replace(_, ' ', 1)
    if in_str.__len__() < 2:
        return False
    return True


p = ImportFile('text.txt')

while (not valid(p)):
    p = increment(p)
print(p)

p = increment(p)
while (not valid(p)):
    p = increment(p)
print(p)
