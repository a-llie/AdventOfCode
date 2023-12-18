const fs = require('fs');
function ImportFile(fileName)
{
    let data = new Object();
    var file = fs.readFileSync(fileName, 'utf8');
    var lines = file.split("\n");

    data.steps = lines.shift().trim();
    lines.shift();
    data.locations = new Object();
    lines.forEach(line => {
      let location = line.split(" =")[0];
      let left = line.split(" = (")[1].split(", ")[0];
      let right = line.split(", ")[1].split(")")[0];
      
      data.locations[location] = {left : left, right: right};

    });
    return data;
}

function PartOne(data) {

  let current_location = 'AAA';

  let destination = 'ZZZ';

  let steps = 0;
  let current_step = 0; 
  while (current_location !== destination)
  {
    if (current_step >= data.steps.length) current_step = 0;
    let next_step = (data.steps.charAt(current_step));
    
    if (next_step === 'L')
    {
      current_location = data.locations[current_location].left;
      current_step++
      steps++;
    }
    else if (next_step ==='R')
    {
      current_location = data.locations[current_location].right;
      current_step++
      steps++;
    }
  }
  return steps;
}
  
function PartTwo(data) {

  let starts = Object.keys(data.locations).filter(key => key.endsWith('A'));
  let completions = new Array(starts.length).fill(false);
  let current_step = 0;
  let steps = 0;

  let counts = new Array();
  while (completions.includes(false)){
    if (current_step >= data.steps.length) current_step = 0;
    for (let i = 0; i < starts.length; i++)
    {
      if (completions[i] === true) continue;
      let start = starts[i];
      let next_step = (data.steps.charAt(current_step));
      if (next_step === 'L') starts[i] = data.locations[start].left;
      else if (next_step ==='R') starts[i] = data.locations[start].right;

      if (starts[i].endsWith('Z'))
      {
        completions[i] = true;
        counts.push(steps+1); 
      }
      else 
      {
        completions[i] = false;
      }
    }
    current_step++
    steps++;
  }

  let LCM = Math.max(...counts); 
  while (true)
  {
    let allDivisible = true;
    for (let i = 0; i < counts.length; i++)
    {
      if (LCM % counts[i] !== 0) allDivisible = false;
    }
    if (allDivisible) break;
    LCM+=Math.max(...counts);
  }
  let sum = 1;
  for (let i = 0; i < counts.length; i++)
  {
    sum *= counts[i];
  }
  return LCM ;
}

let data = ImportFile("text.txt");
console.log(PartOne(data));
console.log(PartTwo(data));