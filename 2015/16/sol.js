const fs = require('fs');

const reqs = {
    'children': 3,
    'cats': 7,
    'samoyeds': 2,
    'pomeranians': 3,
    'akitas': 0,
    'vizslas': 0,
    'goldfish': 5,
    'trees': 3,
    'cars': 2,
    'perfumes': 1,
}

function ImportFile(fileName)
{
    let lines =  (fs.readFileSync(fileName, 'utf8')).split('\n'); 
    let data = new Object()
    for (let line of lines)
    {
        let num = line.split(':')[0].split('Sue')[1]
        data[num] = new Object();
        line = line.replace(':', '>')
        let vars = line.split('> ')[1].split(', ');
        for (const r of Object.keys(reqs))
        {
            data[num][r] = null;
        }
        for (const v of vars)
        {
            let t = v.split(': ')[0];
            if (data[num][t] === undefined) continue;
            data[num][t] = Number(v.split(': ')[1]);
        }
    }

    return data;
}

function P1(data, P2 = false)
{
    let aunts = JSON.parse(JSON.stringify(data));
    for (const r of Object.keys(reqs))
    {
        let cpy = new Object();
        for (const aunt of Object.keys(aunts))
        {
            if (aunts[aunt][r] === null)
            {
                cpy[aunt] = (aunts[aunt]);
                continue;
            } 
            if (P2 && (r === 'cats' || r === 'trees'))
            {
                if (aunts[aunt][r] > reqs[r])
                    cpy[aunt] = (aunts[aunt]);
            }
            else if (P2 && (r === 'pomeranians' || r === 'goldfish'))
            {
                if (aunts[aunt][r] < reqs[r])
                    cpy[aunt] = (aunts[aunt]);
            }
            else if (aunts[aunt][r] === reqs[r])
            {
                cpy[aunt] = (aunts[aunt]);
            }
        }
        aunts = cpy;
        
    }
    return Object.keys(aunts);
}

data = ImportFile('text.txt');
console.log(P1(data));
console.log(P1(data, true));
