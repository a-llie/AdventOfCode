const fs = require('fs');

function ImportFile(fileName, expansion)
{
    let data = new Object();
    var file = fs.readFileSync(fileName, 'utf8');
    var lines = file.split("\n");

    data.lines = new Object();

    let offset_x = new Array(lines[0].length-1).fill(0); 
    let offset_y = new Array(lines.length).fill(0);

    let y_sum = 0;
    let x_sum = 0;
    for (let i = 0; i < lines.length; i++)
    {
      if (!lines[i].includes('#'))
      {
        y_sum+= expansion;
      }
      offset_y[i] = y_sum;
    }
    for (let i = 0; i < lines[0].length-1; i++)
    {
      var col = lines.map(function(value,index) { return value[i]; })
      if (!col.includes('#'))
      {
        x_sum+= expansion;
      }
      offset_x[i] = x_sum;
    }

    let sum = 1;
    for (let i = 0; i < lines.length; i++)
    {
      for (let j = 0; j < lines[i].length; j++)
      {  
        if (lines[i][j] === '#')
        {
          data.lines[sum] = {x: j + offset_x[j], y: i + offset_y[i]};
          sum++;
        }
      }
    }
    data.x = lines[0].length + offset_x[offset_x.length -1] -1;
    data.y = lines.length + offset_y[offset_y.length -1];
    return data;
}

function Run(data) {
  let galaxies = Object.keys(data.lines);
  let sum = 0;
  for (let i = 0; i < galaxies.length; i++)
  {
    let g1 = data.lines[galaxies[i]];
    for (let j = i+1; j < galaxies.length; j++)
    {
      let g2 = data.lines[galaxies[j]];
      if (g2.x === g1.x)
      {
        sum += Math.abs(g2.y - g1.y);
      }
      else if (g2.y === g1.y)
      {
        sum += Math.abs(g2.x - g1.x);
      }
      else 
      {
        let d1 = Math.max(g2.x, g1.x) - Math.min(g2.x,g1.x);
        let d2 = Math.max(g2.y, g1.y) - Math.min(g2.y,g1.y);
        let dist = d2 + d1;
        sum += dist;
      }
    }
  }
  return sum;
}
  
function Solve(file, expansion) {
  let data = ImportFile(file, expansion);
  return Run(data);
}

console.log(Solve("text.txt", 1));
console.log(Solve("text.txt", 999999));