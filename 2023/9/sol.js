const fs = require('fs');

function ImportFile(fileName)
{
 
    let data = new Object();
    var file = fs.readFileSync(fileName, 'utf8');
    var lines = file.split("\n");

    data.lines = new Array();

    lines.forEach(line=> {

      data.lines.push(line.split(" "));
      data.lines[data.lines.length-1].forEach((element, index, array) => {
        array[index] = parseInt(element);
      });

    });

    return data;
}

function Run(data) {
  let sum = 0;
  let left_sum = 0;
  data.lines.forEach(line => {
    let unique_diffs = new Set();
    let prev_diffs = new Array();
    prev_diffs.push(new Array());
    line.forEach((element) => {
      prev_diffs[prev_diffs.length-1].push(element);
    });
    prev_diffs[prev_diffs.length-1].push(null);
    while (true)
    {
      let differences = new Array();
      for (let i = 0; i < prev_diffs[prev_diffs.length-1].length -2; i++)
      { 
        differences.push(prev_diffs[prev_diffs.length-1][i+1] - prev_diffs[prev_diffs.length-1][i]);
        unique_diffs.add(prev_diffs[prev_diffs.length-1][i+1] - prev_diffs[prev_diffs.length-1][i]);
      }
      prev_diffs.push(differences);
      
      if (unique_diffs.size === 1 && unique_diffs.has(0))
      {
        prev_diffs[prev_diffs.length-1].push(0);
        break;
      }
      else
      {
        unique_diffs.clear();
        prev_diffs[prev_diffs.length-1].push(null);
      }
    }

    let local_sum = 0;
    for (let i = prev_diffs.length - 2; i >= 0; i--)
    {
      let arr = prev_diffs[i];
      local_sum += arr[arr.length - 2];
      arr[arr.length - 1] = local_sum;
    }
    for (let i = prev_diffs.length - 2; i >= 0; i--)
    {
      let arr = prev_diffs[i];
      arr.unshift(arr[0] - prev_diffs[i+1][0]);
    }
    sum += local_sum;
    left_sum += prev_diffs[0][0];
  }); 
  
  console.log(sum);
  console.log(left_sum);
}
  

let data = ImportFile("text.txt");
Run(data);