const fs = require('fs');

function ImportFile(fileName)
{
    var file = fs.readFileSync(fileName, 'utf8');
    lines = file.split("\n");

    lines.forEach((line) => {
        line = line.trim();
    });
    return lines;
}

function PartOne(data) {
    let forbidden = ["ab", "cd", "pq", "xy"];
    let vowels = ["a", "e", "i", "o", "u"];
    let sum = 0;

    for (let i = 0; i < data.length; i++) {
        
        if (forbidden.some(fb=>data[i].includes(fb))) continue;

        let double = false;
        for (let j = 0; j < data[i].length -1; j++) {
            if (data[i][j] === data[i][j+1]) {
                double = true;
                break;
            }
        }
        if (!double) continue;
        let count = { a: 0, e: 0, i: 0, o: 0, u: 0}
        for (let j = 0; j < vowels.length; j++) {
            for (let k = 0; k < data[i].length; k++) {
                if (data[i][k] === vowels[j]) {
                    count[vowels[j]]++;
                }
            }
        }
        if (Object.values(count).reduce((a,b)=>a+b) < 3) continue;
        
        sum++;

    }
    return sum;
}


function PartTwo(data)
{
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        let doubles = false;
        let sandwich = false;
        for (let j = 0; j < data[i].length -1; j++ )
        {
            let i1 = data[i].indexOf(data[i][j] + data[i][j+1]);
            let i2 = data[i].lastIndexOf(data[i][j] + data[i][j+1]);
            if (i1 !== i2 && (i1 +1 !== i2)) {
                doubles = true;
                break;
            }
        }

        if (!doubles) continue;

        for (let j = 0; j < data[i].length -2; j++ )
        {
            if (data[i][j] === data[i][j+2]) {
                sandwich = true;
                break;
            }
        }

        if (!sandwich) continue;
        sum++;
    }
    return sum;
}
let data = ImportFile("text.txt");
console.log(PartOne(data));
console.log(PartTwo(data));


