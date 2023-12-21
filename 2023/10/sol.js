const fs = require('fs');

function ImportFile(fileName)
{
 
    let data = new Object();
    var file = fs.readFileSync(fileName, 'utf8');
    var lines = file.split("\n");

    data.chars = new Object();
    let valid_chars = new Set(['|', '-', 'L', 'J', '7', 'F', 'S']);
    for (let i = 0; i < lines.length; i++)
    {
      for (let j = 0; j < lines[i].length; j++)
      {
        if (valid_chars.has(lines[i][j]))
        {
          data.chars[[i,j].toString()] = {char : (lines[i][j]), distance : 0};
          if(lines[i][j] === 'S')
          {
            data.starting_point = {y: i, x: j};
          
          }
          data.y = i;
        }
        data.x = j;
      }
    }

    return data;
}

function PartOne(data) {
  let distances = new Array();

  CheckEachDirection(data, 0, data.starting_point.x, data.starting_point.y);

  let largest = 0; 


  let string = ""; 
  for (let i = 0; i < data.y; i++)
  {
    for (let j = 0; j < data.x; j++)
    {
      if (data.chars[[i,j].toString()] && data.chars[[i,j].toString()].distance > largest)
      {
        largest = data.chars[[i,j].toString()].distance;
      }
      if (data.chars[[i,j].toString()] && data.chars[[i,j].toString()].distance > 0)
      {
        string += " ";
      }
      else if (data.chars[[i,j].toString()] && data.chars[[i,j].toString()].char === 'S')
      {
        string += "S";
      }
      else if (data.chars[[i,j].toString()] )
      {
        string += "X";
      }
      else 
      {
        string += ".";
      
      }
    }
    string+= "\n";
  }

  // let lines = string.split("\n");
  // for (let i = 0; i < lines.length; i++)
  // {
  //   for (let j = 0; j < lines[i].length; j++)
  //   {
  //     if (lines[i][j] === '.')
  //     {
  //       let surrounded = false; 
  //       //check all eight directions
  //       if ()
  //     }
  //   }
    
     

  //}
  console.log(string);
  return largest;

}

//'|', '-', 'L', 'J', '7', 'F', '.', 'S'
function CheckEachDirection(data, sum, x, y) 
{
  let char = data.chars[[y,x].toString()].char;
  if (data.chars[[y,x].toString()].distance > 0)
  {
    let min = Math.min( sum, data.chars[[y,x].toString()].distance);
    data.chars[[y,x].toString()].distance = min;
    sum = min;
  }
  else
  {
    data.chars[[y,x].toString()].distance = sum;
  }
  let up = new Set(['|', '7', 'F', 'S']);
  let down = new Set(['|', 'J', 'S', 'L']);
  let right = new Set(['-', 'S','J', '7']);
  let left = new Set(['-', 'S', 'L', 'F']);

  let left_char = data.chars[[y,x-1].toString()];
  let right_char = data.chars[[y,x+1].toString()];
  let up_char = data.chars[[y-1,x].toString()];
  let down_char = data.chars[[y+1,x].toString()];

  let go_left = false;
  let go_right = false;
  let go_up = false;
  let go_down = false;

  if (left_char && left_char.distance < sum && left_char.distance > 0) left_char = false;
  if (right_char && right_char.distance < sum && right_char.distance > 0) right_char = false;
  if (up_char && up_char.distance < sum && up_char.distance > 0) up_char = false;
  if (down_char && down_char.distance < sum && down_char.distance > 0) down_char = false;

  // console.log(".".repeat(sum), char);
  switch(char)
  {
    case 'S':
      //check down
      if (sum > 0) return;
      if (down_char && down.has(down_char.char)) go_down = true;

      //check left
      if (left_char && left.has(left_char.char)) go_left = true;
      //check right
      if (right_char && right.has(right_char.char)) go_right = true;
      //check up 
      if (up_char && up.has(up_char.char)) go_up = true;

      break;
    case '|'://up, down
      //check up
      if (up_char && up.has(up_char.char)) go_up = true;
      //check down
      if (down_char && down.has(down_char.char)) go_down = true;

      break;
    case '-'://right,left   
      //check left
      if (left_char && left.has(left_char.char)) go_left = true;
      //check right
      if (right_char && right.has(right_char.char)) go_right = true;
      break;
    case 'L':// up, right
      //check up
      if (up_char && up.has(up_char.char)) go_up = true;
      //check right
      if (right_char && right.has(right_char.char)) go_right = true;
      break;
    case 'J':// left, up
      //check left
      if (left_char && left.has(left_char.char)) go_left = true;
      //check up
      if (up_char && up.has(up_char.char)) go_up = true;
      break;
    case '7':// left, down
      //check left
      if (left_char && left.has(left_char.char)) go_left = true;
      //check down
      if (down_char && down.has(down_char.char)) go_down = true;
      break;
    case 'F'://right, down
      //check right
      if (right_char && right.has(right_char.char)) go_right = true;
      //check down
      if (down_char && down.has(down_char.char)) go_down = true;
      break;
  }

  if (go_left) CheckEachDirection(data, sum+1, x-1, y);
  if (go_right) CheckEachDirection(data, sum+1, x+1, y);
  if (go_up) CheckEachDirection(data, sum+1, x, y-1);
  if (go_down) CheckEachDirection(data, sum+1, x, y+1);
}


let data = ImportFile("text.txt");
console.log(PartOne(data));