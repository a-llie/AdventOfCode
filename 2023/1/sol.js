const fs = require('fs');

let data = ImportFile("text.txt");

console.log(PartOne(data));
console.log(PartTwo(data));

function ImportFile(fileName)
{
  let data = new Object();
  var file = fs.readFileSync(fileName, 'utf8');
  var lines = file.split("\n");

  data = lines;

  return data;
}

function PartOne(input) {
    let sums = new Object(); 

    input.forEach(line => {
      sums[input.indexOf(line)] = new Array();
      for (let i = 0; i < line.length; i++) {
        if (isNumber(line[i])) sums[input.indexOf(line)].push(line[i]);
      }
    });

    let keys = Object.keys(sums);
    let sum = 0; 
    keys.forEach(key => {
      sum+= Number(sums[key][0] + "" + sums[key][sums[key].length-1]);
    });
    return sum;
}
  
function PartTwo(input) { 
    let valid = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let subs = new Object();
    input.forEach(line => {
      subs[input.indexOf(line)] = new Object();
      subs[input.indexOf(line)][0] = new Object();
      subs[input.indexOf(line)][1] = new Object();
      subs[input.indexOf(line)][0].value = "";
      subs[input.indexOf(line)][1].value = "";
      let prev_first = 1000;
      let prev_last = -1;
      for (let i = 0; i < valid.length; i++)
      {
        let v = valid[i]; 
        let f_pos = line.indexOf(v);
        if (f_pos !== -1 && f_pos < prev_first)
        {
          prev_first = f_pos;
          subs[input.indexOf(line)][0].value = convertToNum(v);
        } 
        let l_pos = line.lastIndexOf(v);
        if (l_pos !== -1 && l_pos > prev_last) 
        {
          prev_last = l_pos;
          subs[input.indexOf(line)][1].value = convertToNum(v);
        } 
      }
      if (prev_last === -1) {subs[input.indexOf(line)][1].value = subs[input.indexOf(line)][0].value;}

    });
    let sum = 0; 
    input.forEach(line => {
      let a = subs[input.indexOf(line)][0].value; 
      let b = subs[input.indexOf(line)][1].value;

      sum += Number(a + "" + b);
    });
    return sum;
  }

function isNumber(char) {
  return /^\d$/.test(char);
}

function convertToNum(s)
{
  let dict = {
    "one" : 1,
    "two":  2,
    "three": 3, 
    "four": 4,
    "five": 5, 
    "six": 6, 
    "seven" : 7,
    "eight" : 8,
    "nine":  9,
    "1" :  1,
    "2": 2,
    "3":  3,
    "4": 4,
    "5":  5,
    "6": 6,
    "7": 7,
    "8": 8, 
    "9" :  9
  }

  return dict[s];
}