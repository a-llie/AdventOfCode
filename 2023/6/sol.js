const fs = require('fs');

function ImportFile(fileName)
{
 
    let data = new Object();
    var file = fs.readFileSync(fileName, 'utf8');
    var lines = file.split("\n");

    let times = lines[0].split("Time: ")[1].replace(/\r/gm,'').split(" ").filter(x => x !== '');
    let distance = lines[1].split("Distance: ")[1].replace(/\r/gm,'').split(" ").filter(x => x !== '');


    
    data.times = times.map(x => parseInt(x));
    data.distance = distance.map(x => parseInt(x));


    return data;
}



function PartOne(input) {

    let sum = 1;
    for (let i = 0; i < input.times.length; i++)
    {
      let time = input.times[i];
      let distance = input.distance[i];
      let solution = Math.ceil(((-time) + Math.sqrt(Math.pow(time, 2) - (4 * (-1) * (-(distance + 1)))))/-2);
      let solution2 = Math.floor(((-time) - Math.sqrt(Math.pow(time, 2) - (4 * (-1) * (-(distance + 1)))))/-2);
      let total = Math.max(solution, solution2) - Math.min(solution, solution2) + 1;

      sum *= total;
    }

    return sum;
  }
  
function PartTwo(input) {
    
    //add up all the times in the array
    let time = parseInt(input.times.join(''));
    let distance = parseInt(input.distance.join(''));
    let sum = 1;
      let solution = Math.ceil(((-time) + Math.sqrt(Math.pow(time, 2) - (4 * (-1) * (-(distance + 1)))))/-2);
      let solution2 = Math.floor(((-time) - Math.sqrt(Math.pow(time, 2) - (4 * (-1) * (-(distance + 1)))))/-2);
      let total = Math.max(solution, solution2) - Math.min(solution, solution2) + 1;

      sum *= total;

    return sum;
  }


let data = ImportFile("text.txt");


console.log(PartOne(data));
console.log(PartTwo(data));







//helpers
function CleanArray(input, char)
{
  return input.filter(function (el) {
    return el !== char;
  });
}


function isNumber(char) {
  return /^\d$/.test(char);
}
