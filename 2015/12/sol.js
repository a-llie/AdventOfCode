const fs = require('fs');
let P1sum = 0;
let P2sum = 0;

function ImportFile(fileName)
{
    return JSON.parse(fs.readFileSync(fileName, 'utf8'));
}

function RecursiveTraverse(data, P1 = true)
{
    if (!Array.isArray(data) && Object.values(data).includes('red')&& !P1) return;

    for (const k in data)
    {
        if (typeof(data[k]) == 'object') RecursiveTraverse(data[k], P1);
        else if (!isNaN(data[k])) 
        {
            if (P1) P1sum += parseInt(data[k]);
            else P2sum += parseInt(data[k]);
        }
    }
}

data = ImportFile('text.txt');
RecursiveTraverse(data);
RecursiveTraverse(data, false);

console.log(P1sum, P2sum);