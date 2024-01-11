def ImportFile(fileName):
    file = open(fileName, "r").read().split('\n')
    data = {}
    for i in range(len(file)):
        data[i] = {'letters': {}, 'checksum': '',
                   'sector': None, 'encrypted': ''}
        j = 0
        while (not (file[i][j]).isdigit()):
            if file[i][j] == '-':
                j += 1
                continue

            if not data[i]['letters'].get(file[i][j]):
                data[i]['letters'][file[i][j]] = 1
            else:
                data[i]['letters'][file[i][j]] += 1
            j += 1

        data[i]['sector'] = int(file[i].split('-')[-1].split('[')[0])
        data[i]['checksum'] = (file[i].split(
            '-')[-1].split('[')[1].split(']')[0])
        data[i]['encrypted'] = file[i].split(
            '[')[0].replace(f'-{str(data[i]["sector"])}', '')
    return data


def Validate(data):
    count = 0
    v = []
    for _ in list(data.keys()):
        five_most_common = sorted(
            data[_]['letters'].items(), key=lambda x: (-x[1], x[0]))[:5]

        valid = True
        for i in range(len(five_most_common)):
            if five_most_common[i][0] != data[_]['checksum'][i]:
                valid = False
                break

        if valid:
            v.append(data[_])
            count += data[_]['sector']

    v = Decrypt(v)
    sector = 0
    for _ in v:
        if 'north' in _['encrypted']:
            sector = _['sector']
    return (count, sector)


def Decrypt(data):
    for _ in data:
        _['encrypted'] = list(_['encrypted'])
        for i in range(len(_['encrypted'])):
            for j in range((_['sector'])):
                _['encrypted'][i] = Rotate(_['encrypted'][i])
        _['encrypted'] = ''.join(_['encrypted'])
    return data


def Rotate(char):
    if char == ' ' or char == '-':
        return ' '
    return chr((ord(char) - 97 + 1) % 26 + 97)


data = ImportFile("text.txt")
r = Validate(data)
print(r[0])
print(r[1])
