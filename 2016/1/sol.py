def ImportFile(fileName):
    return open(fileName, "r").read().split(', ')


def Move(data):
    curr = [0, 0]
    visited = set()
    visited_twice = None
    facing = 'North'
    rel = {
        'North': {'L': 'West', 'R': 'East'},
        'East': {'L': 'North', 'R': 'South'},
        'South': {'L': 'East', 'R': 'West'},
        'West': {'L': 'South', 'R': 'North'}
    }

    for d in data:
        v = []
        facing = rel[facing][d[0]]
        if (facing == 'North'):
            for i in range(int(d[1:])):
                v.append((curr[0], curr[1] + i + 1))
            curr[1] += int(d[1:])
        elif (facing == 'East'):
            for i in range(int(d[1:])):
                v.append((curr[0] + i + 1, curr[1]))
            curr[0] += int(d[1:])
        elif (facing == 'South'):
            for i in range(int(d[1:])):
                v.append((curr[0], curr[1] - (i + 1)))
            curr[1] -= int(d[1:])
        elif (facing == 'West'):
            for i in range(int(d[1:])):
                v.append((curr[0] - (i + 1), curr[1]))
            curr[0] -= int(d[1:])
        for i in v:
            if (visited_twice == None and tuple(i) in visited):
                visited_twice = tuple(i)
            visited.add(tuple(i))

    return (abs(curr[0]) + abs(curr[1]), abs(visited_twice[0]) + abs(visited_twice[1]))


data = ImportFile("text.txt")
r = Move(data)
print(r[0])
print(r[1])
