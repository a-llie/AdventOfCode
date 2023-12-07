txt = open("day1.txt", "r")

currValue = 0
firstLargest = 0
secondLargest = 0
thirdLargest = 0

for l in txt:
    if l == "\n":
        if firstLargest < currValue:
            firstLargest = currValue
        elif secondLargest < currValue:
            secondLargest = currValue
        elif thirdLargest < currValue:
            thirdLargest = currValue
        currValue = 0
        continue
    currValue += int(l)


print(firstLargest)
print(firstLargest+secondLargest+thirdLargest)
