const fs = require('fs');
// run with:
// node --stack-size=6800 sol.js

function ImportFile(fileName, p1)
{
    let data = new Object();
    var file = fs.readFileSync(fileName, 'utf8');
    var lines = file.split("\n");

    let i = 0; 
    data.instructions = new Array();
    if (p1)
    {
      lines.forEach(line => {
        let direction = line.split(" ")[0]; 
        let distance = parseInt(line.split(" ")[1]);
        let colour = line.split("(")[1].split(")")[0];
        data.instructions.push([direction, distance, colour]);
        i++;
      });
    }
    else
    {
      lines.forEach(line => {
        let direction = line.split("(")[1].split(")")[0];
        let distance = parseInt(direction.substring(1, 6), 16);
        direction = parseInt(direction[direction.length - 1]);
        let colour = line.split("(")[0]; 

        switch (direction)
        {
          case 0:
            direction = "R";
            break;
          case 1:
            direction = "D";
            break;
          case 2:
            direction = "L";
            break;
          case 3:
            direction = "U";
            break;
        }
        data.instructions.push([direction, distance, colour]);
        i++;
      });
    }

    let currPos = [0,0];
    let max_y = 0;
    let max_x = 0;
    let min_y = null;
    let min_x = null;

    data.grid = new Object();
    data.turning_points = new Array();
    data.sum = 0;
    for (let i = 0; i < data.instructions.length; i++)
    {
      let  instructions = data.instructions[i];
      data.turning_points.push([currPos[0], currPos[1]]);
      if (p1)
      {
        switch (instructions[0])
        {
          case "R":
            for (let i = 0; i < instructions[1]; i++)
            {
              currPos[1] += 1;
              if (currPos[1] > max_x) data.x = max_x = currPos[1];
              if (currPos[1] < min_x || min_x == null) data.low_x = min_x = currPos[1];
              data.grid[currPos.toString()] = instructions[2];
            }
            break;
          case "L":
            for (let i = 0; i < instructions[1]; i++)
            {
              currPos[1] -= 1;
              if (currPos[1] > max_x) data.x = max_x = currPos[1];
              if (currPos[1] < min_x || min_x == null) data.low_x = min_x = currPos[1];
              data.grid[currPos.toString()] = instructions[2];
            }
            break;
          case "U":
            for (let i = 0; i < instructions[1]; i++)
            {
              currPos[0] -= 1;
              if (currPos[0] > max_y) data.y = max_y = currPos[0];
              if (currPos[0] < min_y || min_y == null) data.low_y = min_y = currPos[0];
              data.grid[currPos.toString()] = instructions[2];
            }
            break;
          case "D":
            for (let i = 0; i < instructions[1]; i++)
            {
              currPos[0] += 1;
              if (currPos[0] > max_y) data.y = max_y = currPos[0];
              if (currPos[0] < min_y || min_y == null) data.low_y = min_y = currPos[0];
              data.grid[currPos.toString()] = instructions[2];
            }
            break;
        }
      }
      else 
      {
        switch (instructions[0])
        {
          case "R":
            currPos[1] += instructions[1];
            break;
          case "L":
              currPos[1] -= instructions[1];
            break;
          case "U":
              currPos[0] -= instructions[1];
            break;
          case "D":
              currPos[0] += instructions[1];
            break;
        }
      }
      data.sum+= instructions[1];
    }
    return data;
}

function PartOne() {
  let data = ImportFile("text.txt", true);
  let i = data.low_x;
  while (!data.grid[[data.low_y,i].toString()])
  {
    i++;
  }
  let first_inner_opening = [data.low_y + 1, i+1];
  let sum = FillIn(data, first_inner_opening[0], first_inner_opening[1]);
  return data.sum + sum;
}
  
function FillIn(data, y,x)
{
   if (x > data.x || x < data.low_x || y > data.y || y < data.low_y) return;
   data.grid[[y,x].toString()] = "O";
   let surroundings = [[y+1,x], [y,x+1], [y-1,x], [y,x-1]];
   let sum = 1;
   surroundings.forEach(surrounding => {
    if (!data.grid[surrounding.toString()])
    {
      sum += FillIn(data, surrounding[0], surrounding[1]);
    }
   });
    return sum;
}

function DrawGrid(data)
{
  let string = "";
  for (let i = data.low_y; i <= data.y; i++)
  {
    for (let j = data.low_x; j <= data.x; j++)
    {
      if (data.turning_points.includes([i,j].toString()))
      {
        string += '%';
      }
      else if (data.grid[[i,j].toString()])
      {
        string += '#';
      
      }
      else
      {
        string += ".";
      }
    }
    string += "\n";
  }
  return string;
}


//had to learn how to use Shoelace formula and Pick's Theorem for this one 
// only got part 2 after hints on r/adventofcode
function PartTwo() {
  let data = ImportFile("text.txt", false);
  let turns = data.turning_points;
  let area = 0;
  let total = 0;  
  for (let i = 0; i < turns.length; i++)
  { 
    let c1 = turns[i];
    let c2 = turns[i === turns.length - 1 ? 0 : i + 1];
    area += c1[1] * c2[0] - c1[0] * c2[1];
  }

  area = Math.abs(area / 2);
  for (let i = 0; i < turns.length; i++)
  { 
    let c1 = turns[i];
    let c2 = turns[i === turns.length - 1 ? 0 : i + 1];
    total += Math.abs(c1[1] - c2[1]) + Math.abs(c1[0] - c2[0]);
  }
  return area + 1 - (total / 2) + total;
}

console.log(PartOne());
console.log(PartTwo());