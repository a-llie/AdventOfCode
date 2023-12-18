const fs = require('fs');

function ImportFile(fileName)
{
    var file = fs.readFileSync(fileName, 'utf8');
    var lines = file.split("\n");
    var data = new Object();

    for (let i = 0; i < lines.length; i++) {
      for (let j = 0; j < lines[i].length; j++) {
        if (lines[i][j] === "\r") continue;
        data[[i,j].toString()] = lines[i][j];
        data.x = j+1;
      }
      data.y = i+1;
    }
    for (let i = 0; i < data.y; i++) {
      let string = "";
      for (let j = 0; j < data.x; j++) {
        string += data[[i,j].toString()];
      }
    }
    return data;
}

function Part1(data)
{
  let data_copy = JSON.parse(JSON.stringify(data)); 

  RollRocks(data_copy, "north");

  let sum = 0;
  for (let i = 0; i < data.y; i++) {
    let string = "";
    for (let j = 0; j < data.x; j++) {
      if (data_copy[[i,j].toString()] === "O") {
        sum+= data.y - i ;
      }
      string += data_copy[[i,j].toString()];
    }
  }
  return sum;
}


//still don't know why this works ¯\_(ツ)_/¯
//definitely doesn't work for all inputs
function Part2(data)
{
  let data_copy = JSON.parse(JSON.stringify(data)); 
  let reset = 0;
  let offset = 0;

  let seen_strings = new Object();
  let cycles = new Array(); 
  cycles[0] = new Array();
  let i = 0;
  let resets = new Object();

  while (true && i < 1000000000){
    let inner_sum = 0;
    RollRocks(data_copy, "north");
    RollRocks(data_copy, "west");
    RollRocks(data_copy, "south");
    inner_sum = RollRocks(data_copy, "east");
    i++;
  
    let new_string = DrawRocks(data_copy);
    if (seen_strings[new_string]) 
    {
      reset++;
      if (reset === 1) 
      {
        offset = cycles[cycles.length-1].length + 1;
        cycles[0] = new Array();
      }
      else cycles.push(new Array());
      
      for (const key in seen_strings) {
        delete seen_strings[key];
      }
      if (cycles[cycles.length-2] && (reset + 1 - offset) % cycles[cycles.length-2].length === 0)
      {
        return inner_sum;
      }
      if (resets[inner_sum]) resets[inner_sum]++;
      else resets[inner_sum] = 1;
    }
    else 
    {
      cycles[cycles.length-1].push(inner_sum);
      seen_strings[new_string] = 1;
    }
  }
}

function DrawRocks(data)
{
  let string = "";
  for (let i = 0; i < data.y; i++) {
    
    for (let j = 0; j < data.x; j++) {
      string += data[[i,j].toString()];
    }
    string += "\n";
  } 
  return string;
}

function RollRocks(data,direction)
{
  let i_start = 0;
  let i_end = data.y;
  let j_start = 0;
  let j_end = data.x;
  let sum = 0;
  switch (direction)
  {
    case "north":
      for (let i = i_start; i < i_end; i++) {
        for (let j = j_start; j < j_end; j++) {
          if (data[[i,j].toString()] === "O") {
            sum += Roll(data, i, j, direction);
          }
        }
      }
      break;
    case "west":
      for (let i = i_start; i < i_end; i++) {
        for (let j = j_start; j < j_end; j++) {
          if (data[[i,j].toString()] === "O") {
            sum += Roll(data, i, j, direction);
          }
        }
      }
      break;
    case "east":
      j_start = data.x-1;
      j_end = -1;
      for (let i = i_start; i < i_end; i++) {
        for (let j = j_start; j >= j_end; j--) {
          if (data[[i,j].toString()] === "O") {
            sum += Roll(data, i, j, direction);
          }
        }
      }
      break;
    case "south":
      i_start = data.y-1;
      i_end = -1;
      for (let i = i_start; i >= i_end; i--) {
        for (let j = j_start; j < j_end; j++) {
          if (data[[i,j].toString()] === "O") {
            sum += Roll(data, i, j, direction);
          }
        }
      }
      break;
  }
  return sum;
}

function Roll(data, y, x, direction)
{
  let dy = y;
  let dx = x;
  switch (direction)
  {
    case "north":
      dy = y-1;
      break;
    case "west":
      dx = x-1;
      break;
    case "east":
      dx = x+1;
      break;
    case "south":
      dy = y+1;
      break;
  }

  if (!data[[dy,dx].toString()]) 
  {
    let py = y;
    switch (direction)
    {
      case "north":
        py = y+1;
        break;
      case "south":
        py = y-1;
        break;
    }
    return data.y - py;
  }

  
  if (data[[dy,dx].toString()] === ".")
  {
    data[[dy,dx].toString()] = "O";
    data[[y,x].toString()] = ".";
    return Roll(data, dy, dx, direction);
  }

  return data.y - y;
}







let data = ImportFile("text.txt");
console.log(Part1(data));
console.log(Part2(data));