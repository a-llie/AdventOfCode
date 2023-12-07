list = open('advent2.txt')
lines = list.read().split('\n')


def part1():
    hor = 0
    depth = 0
    for i in range(0, len(lines)):
        if 'forward' in lines[i]:
            hor += int(lines[i][8])
        if 'down' in lines[i]:
            depth += int(lines[i][5])
        if 'up' in lines[i]:
            depth -= int(lines[i][3])
    final = hor*depth
    print("Part one: ", final)


def part2():
    aim = 0
    hor = 0
    depth = 0
    for i in range(0, len(lines)):
        if 'forward' in lines[i]:
            hor += int(lines[i][8])
            depth += int(lines[i][8]) * aim
        if 'down' in lines[i]:
            aim += int(lines[i][5])
        if 'up' in lines[i]:
            aim -= int(lines[i][3])
    final = hor*depth
    print("Part two: ", final)


part1()
part2()
