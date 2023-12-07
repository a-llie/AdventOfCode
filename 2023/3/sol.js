const fs = require('fs');

let special_characters = ",:;!?()[]{}'\"@#$%^&*+-=_~`|\\/<>";

function ImportFile(fileName)
{
    var file = fs.readFileSync(fileName, 'utf8');
    var lines = file.split("\n");

    return lines;
}
  

function PartOne(lines)
{
  let sum = 0;
  let numbers = new Object();
  let surrounding_characters = new Object();
  for (let j = 0; j < lines.length; j++) {
    
    let line = lines[j];
    line.replace(/(\r||\n)/g, "");
    for (let i = 0; i < line.length; i++) {
      if (isNumber(line[i]))
      {
        let full_num = "";
        let k = 0; 
        let already_added = false;
        while (k < line.length && isNumber(line[i+k]))
        {
          full_num += String(line[i+k]);
          k++;
        }


        if (lines[j-1] !== undefined)
        {
          let length = full_num.length;
          let goal = length + i + 1;
          
          let start_pos = i > 0 ? i - 1 : i;
          while (start_pos < goal)
          {
            if (special_characters.includes(lines[j-1][start_pos]))
            {
              let char = lines[j-1][start_pos];
              let pos = [j-1, start_pos];
              if (!surrounding_characters[char]) surrounding_characters[char] = new Object();
              if (!surrounding_characters[char][pos]) surrounding_characters[char][pos] = new Array();
              surrounding_characters[char][pos].push(full_num);
              already_added = true;
              
            }
            start_pos++;
          }
        }

        //left
        if (lines[j][i-1] !== undefined)
        {
          if(special_characters.includes(lines[j][i-1]))
          {
            let char = lines[j][i-1]
            let pos = [j, i -1];
            if (!surrounding_characters[char]) surrounding_characters[char] = new Object();
            if (!surrounding_characters[char][pos]) surrounding_characters[char][pos] = new Array();
            surrounding_characters[char][pos].push(full_num);
            already_added = true;
          }

        }

        //right 
        let length = full_num.length;
        if (lines[j][i+length] !== undefined)
        {
          if(special_characters.includes(lines[j][i+length]))
          {
            let char = lines[j][i+length]
            let pos = [j, i + length];
            if (!surrounding_characters[char]) surrounding_characters[char] = new Object();
            if (!surrounding_characters[char][pos]) surrounding_characters[char][pos] = new Array();
            surrounding_characters[char][pos].push(full_num);
            already_added = true;
          }
        }
        //below
        if (lines[j+1] !== undefined)
        {
          let length = full_num.length;
          let goal = length + i + 1;
          
          let start_pos = i > 0 ? i - 1 : i;
          while (start_pos < goal)
          {
            if (special_characters.includes(lines[j+1][start_pos]))
            {
              let char = lines[j+1][start_pos];
              let pos = [j+1, start_pos];
              if (!surrounding_characters[char]) surrounding_characters[char] = new Object();
              if (!surrounding_characters[char][pos]) surrounding_characters[char][pos] = new Array();
              surrounding_characters[char][pos].push(full_num);
              already_added = true;
              
            }
            start_pos++;
          }
        }

        if (surrounding_characters.length > 0)
        {
          if (!numbers[full_num]) 
          {
            numbers[full_num] = new Array();
            
          }
          numbers[full_num].push(surrounding_characters);
          
        }
        i += k;

        if (already_added === true)
        {
          sum+= Number(full_num);
        }
      }
    }
  }
  data.surrounding_characters = surrounding_characters;
  return sum;
}


function PartTwo(data) {
    let star = data["*"];
    let sum = 0;
    let keys = Object.keys(star);
    keys.forEach(key => {
    
        if (star[key].length > 1)
        {
            let mul = 1; 
            star[key].forEach(num => {
                mul *= Number(num);
            });
            sum += mul;
        }
    });
    return sum;
}


let data = ImportFile("text.txt");
console.log(PartOne(data));
console.log(PartTwo(data.surrounding_characters));



function isNumber(char) {
  return /^\d$/.test(char);
}
