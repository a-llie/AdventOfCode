with open('day7.txt') as list:
	lines = list.read().split(',')

lines2 = []
lines3 = [] 

for i in range(len(lines)):
    lines2.append(int(lines[i]))

for i in range(0, max(lines2)+1):
    lines3.append(i)




def part1():
    fuel = []
    for i in range(len(lines2)):
        totalfuel = 0
        for j in range(len(lines2)):
            if not(lines2[j] == lines2[i]):
                if lines2[j] > lines2[i]:
                    totalfuel += (lines2[j] - lines2[i])
                else:
                    totalfuel += lines2[i] - lines2[j]
        fuel.append(totalfuel)
    print("Part 1: Must spend:", min(fuel))

def part2():
    fuel = []
    for i in range(0,len(lines3)):
        totalfuel = 0
        for j in range(0,len(lines2)):
                if lines2[j] > lines3[i]:
                    number = lines2[j] - lines3[i]
                    totalfuel += (number*(number+1))//2 
                elif lines3[i] > lines2[j]:
                    number = (lines3[i] - lines2[j])
                    totalfuel += (number*(number+1))//2         
        fuel.append(totalfuel)
    print("Part 2: Must spend:", min(fuel))



def main():
    part1()
    part2()

main()
