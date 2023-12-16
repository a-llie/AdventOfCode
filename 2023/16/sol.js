const fs = require('fs');

function ImportFile(fileName)
{
    var file = fs.readFileSync(fileName, 'utf8');
    var lines = file.split("\n");

    lines.forEach((element) => {
      element = element.replace(/\r/gm, '');
    });
    let data = new Object();
    data.lines = lines;
    data.grid = new Array();
    data.visited = new Array();

    for (let i = 0; i < lines.length; i++)
    {
      data.grid[i] = new Array();
      data.visited[i] = new Array();
      for (let j = 0; j < lines[i].length; j++)
      {
        if (lines[i][j] === "\r") continue;
        data.grid[i].push(lines[i][j]);
        data.visited[i][j] = [0];
      }
    }
    return data;
}

function Part1(data, x,y, direction)
{
  data.lines_copy = data.lines.slice();
  Beam(data, y, x, direction);
  let count = 0;
  for (let i = 0; i < data.visited.length; i++)
  {
    for (let j = 0; j < data.visited[i].length; j++)
    {
      if (data.visited[i][j][0] === 1) count++;
    }
  }
  return count;
}

function Part2(data)
{
  let count = new Array();  

  for (let i = 0; i < data.visited.length; i++)
  {
    ClearGrid(data);
    count.push(Part1(data, i, 0, "right"));
    ClearGrid(data);
    count.push(Part1(data, i, data.visited[i].length-1, "left"));
  }
  for (let i = 0; i < data.visited[0].length; i++)
  {
    ClearGrid(data);
    count.push(Part1(data, 0, i, "down"));
    ClearGrid(data);
    count.push(Part1(data, data.visited.length-1, i, "up"));
  }
  console.log(count);
  return Math.max(...count);
}

function ClearGrid(data)
{
  data.grid = new Array();
  data.visited = new Array();

  for (let i = 0; i < data.lines.length; i++)
  {
    data.grid[i] = new Array();
    data.visited[i] = new Array();
    for (let j = 0; j < data.lines[i].length; j++)
    {
      if (data.lines[i][j] === "\r") continue;
      data.grid[i].push(data.lines[i][j]);
      data.visited[i][j] = [0];
    }
  }
}

function Beam(data, x, y, direction)
{
  if (!data.grid[y] || !data.grid[y][x]) return; 
  else 
  {
    data.grid[y][x] = "#";
    data.visited[y][x][0] = 1;
    data.visited[y][x].push(direction);
  }

  let movements = {
    "right" : { "." : [[y,x+1, "right"]], "|" : [[y+1, x, "down"], [y-1,x, "up"], [y,x, "stop"]], "-" : [[y,x+1, "right"]], "\\" : [[y+1,x, "down"]], "/" : [[y-1,x, "up"]]},
    "left" : { "." : [[y,x-1, "left"]], "|" : [[y+1, x, "down"], [y-1,x, "up"], [y,x, "stop"]], "-" : [[y,x-1, "left"]], "\\" : [[y-1,x, "up"]], "/" : [[y+1,x, "down"]]},
    "up" : { "." : [[y-1,x, "up"]], "|" : [[y-1, x, "up"]], "-" : [[y,x-1, "left"], [y,x+1, "right"], [y,x,"stop"]], "\\" : [[y,x-1, "left"]], "/" : [[y,x+1, "right"]]},
    "down" : { "." : [[y+1,x, "down"]], "|" : [[y+1, x, "down"]], "-" : [[y,x-1, "left"], [y,x+1, "right"], [y,x, "stop"]], "\\" : [[y,x+1, "right"]], "/" : [[y,x-1, "left"]]},
    "stop" : { "." : [], "|" : [], "-" : [], "\\" : [], "/" : []},
  }
  if (!movements[direction][data.lines[y][x]]) return;
  movements[direction][data.lines[y][x]].forEach(element => {
    if (data.grid[element[0]] && data.grid[element[0]][element[1]] && !data.visited[element[0]][element[1]].includes(element[2])) Beam(data, element[1], element[0], element[2]);
  });
}

let data = ImportFile("text.txt");
console.log(Part1(data, 0, 0, "right"));
console.log(Part2(data));