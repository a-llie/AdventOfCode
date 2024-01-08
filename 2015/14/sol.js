const fs = require('fs');
const time = 2503; 

function ImportFile(fileName)
{
    let lines =  (fs.readFileSync(fileName, 'utf8')).split('\n'); 
    let data = new Object()
    for (const line of lines)
    {
        let reindeer = line.split(' ')[0];
        let x = { s :  Number(line.split(' ')[3]), t : Number(line.split(' ')[6]), r : Number(line.split(' ')[13]) };
        data[reindeer] = x;
    }
    return data;
}

function FindWinner(data, time)
{
    let max = 0;
    let keys = Object.keys(data);
    let winner = "";
    for (let i = 0; i <  keys.length; i++)
    {
        let reindeer = keys[i];
        let sum = Math.floor((time / (data[reindeer].t + data[reindeer].r))) * data[reindeer].s * data[reindeer].t;
        let remainder = time % (data[reindeer].t + data[reindeer].r);
        if (remainder > data[reindeer].t)
            remainder = data[reindeer].t;

        sum += remainder * data[reindeer].s;
        if (sum > max)
        {
            max = sum;
            winner = [reindeer];
        }
    }
    return { winner : winner, max : max };
}

function ScorePoints(data)
{
    let points = new Object();

    for (let i = 1; i <= time; i++)
    {
        let result = FindWinner(data, i);
        if (points[result.winner] === undefined) points[result.winner] = 1;
        else points[result.winner]++;
    }
    return Math.max(...Object.values(points));
}

data = ImportFile('text.txt');
console.log(FindWinner(data,time).max);
console.log(ScorePoints(data));

