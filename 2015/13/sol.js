const fs = require('fs');
const itertools = require('itertools')


function ImportFile(fileName)
{
    let lines =  (fs.readFileSync(fileName, 'utf8')).split('\n'); 

    let data = { p : new Set(), edges : new Object() };

    for (const line of lines)
    {
        let a = line.split(' ')[0];
        let b = line.split(' ')[10].split('.')[0];
        data.p.add(a);
        data.p.add(b);
        if (!data.edges[a]) data.edges[a] = new Object();

        if (line.split(' ')[2] == 'gain') 
        {
            data.edges[a][b] = parseInt(line.split(' ')[3]);
        }
        else 
        {
            data.edges[a][b] = -parseInt(line.split(' ')[3]);
        }
    }


    data.edges['me'] = new Object();
    for (const p of data.p)
    {
        data.edges[p]['me'] = 0;
        data.edges['me'][p] = 0;        
    }

    data.p.add('me');
    return data;
}

data = ImportFile('text.txt');




function Seat(P1 = true)
{
    let max = 0;
    let perms = [];
    if (P1 ) perms = itertools.permutations([...data.p].filter(x => x != 'me'));
    else  perms = itertools.permutations([...data.p]);
    for (let perm of perms)
    {
        perm.push(perm[0]);
        sum = 0;
        for (let i = 0; i < perm.length -1; i++)
        {
            let a = perm[i];
            let b = perm[(i+1)];
            sum += data.edges[a][b] + data.edges[b][a];
        }
        if (sum > max) max = sum;
    }
    return max;
}   


console.log(Seat());
console.log(Seat(false));


