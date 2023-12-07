list = open('advent1.txt','r')
lines = list.read().split('\n')
for i in range(0, len(lines)):
    lines[i] = int(lines[i])


def part1():
    count = 0
    for i in range(0,len(lines)-1):
        if lines[i+1] > lines [i]:
            count+=1
    print("Part one:",count)

def part2():
    tri_lines = []
    for i in range(0,len(lines)-2):
        tri_lines.append(lines[i] + lines[i+1] + lines [i+2]) 
    count = 0
    for i in range(0,len(tri_lines)-1):
        if tri_lines[i+1] > tri_lines [i]:
            count+=1
    print("Part two:",count)

part1()
part2()
