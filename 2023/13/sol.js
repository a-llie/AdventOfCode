const fs = require('fs');

function ImportFile(fileName)
{
    let data = new Object();
    var file = fs.readFileSync(fileName, 'utf8');
    var lines = file.split("\n");

    data.grids = new Array();

    let grid = new Array();
    lines.forEach(line => {
      if (!lines.includes(".") && !line.includes("#"))
      {
        data.grids.push(grid);
        grid = new Array();
      }
      else
      {
        grid.push(line.replace(/\r/gm,""));
      }
    });

    data.grids.push(grid);
    return data;
}

function Part1(data) {
  let grids = data.grids; 
  let sum = 0;
  grids.forEach(grid => {
    let grid_cols = new Array();
    let v_reflection = new Array();
    for (let i = 0; i < grid[0].length; i++)
    {
      var col = grid.map(function(value) { return value[i]; })
      grid_cols.push(col.join(""));
    }
    for (let i = 0; i < grid_cols.length; i++)
    {
      if (grid_cols[i] === grid_cols[i+1])
      {
        v_reflection.push([i, i+1, 1]);
      }
    }

    let h_reflection = new Array();
    for (let i = 0; i < grid.length; i++)
    {
      if (grid[i] === grid[i+1])
      {
        h_reflection.push([i, i+1,1]);
      }
    }

    h_reflection.forEach(row => {
      if (Recurse(grid, row[0], row[1], 1, row[2]))
      {
        sum+= row[1] * 100;
      }
    });

    v_reflection.forEach(col => {
      if (Recurse(grid_cols, col[0], col[1], 1, col[2]))
      {
        sum+= col[1];
      }      
    });

  });
  return sum;
    
}

function Part2(data) {
  
  let grids = data.grids;
  let sum = 0;
  grids.forEach(grid => {
    let smudged_rows = new Array();
    let smudged_cols = new Array();
    for (let i = 0; i < grid.length-1; i++)
    {
      let diff = 0;
      if (grid[i] === grid[i+1])
      {
        smudged_rows.push([i, i+1, 0]);
        continue;
      }
      for (let j = 0; j < grid[i].length; j++)
      {
        if (grid[i][j] !== grid[i+1][j])
        {
          diff++;
        }
      }
      if (diff === 1)
      {
        smudged_rows.push([i, i+1, 1]);
      }
    }
    let grid_as_cols = new Array();
    for (let i = 0; i < grid[0].length; i++) {
      var col = grid.map(function(value) { return value[i]; })
      grid_as_cols.push(col.join(""));
    }
    for (let i = 0; i < grid_as_cols.length-1; i++)
    {
      let diff = 0;
      if (grid_as_cols[i] === grid_as_cols[i+1])
      {
        smudged_cols.push([i, i+1, 0]);
        continue;
      }
      for (let j = 0; j < grid_as_cols[i].length; j++)
      {
        if (grid_as_cols[i][j] !== grid_as_cols[i+1][j])
        {
          diff++;
        }
      }
      if (diff === 1)
      {
        smudged_cols.push([i, i+1, 1]);
      }
    }

    smudged_rows.forEach(row => {
      if (Recurse(grid, row[0], row[1], 1, row[2]))
      {
        sum+= row[1] * 100;
      }
    });

    smudged_cols.forEach(col => {
      if (Recurse(grid_as_cols, col[0], col[1], 1, col[2]))
      {
        sum+= col[1];
      }      
    });
  });
  return sum;
}
  
function Recurse(grid, r0, r1, offset, diff_num)
{
  if (!grid[r0 - offset] || !grid[r1 + offset])
  {
    if (diff_num === 1) return true;
    else return false;
  }

  for (let i = 0; i < grid[r0 - offset].length; i++)
  {
    if (grid[r0 - offset][i] !== grid[r1 + offset][i])
    {
      diff_num++;
    }
  }
  if (diff_num > 1)
  {
    return false;
  }
  else 
  {
    return Recurse(grid, r0, r1, offset + 1, diff_num);
  }
}

let data = ImportFile("text.txt");
console.log(Part1(data));
console.log(Part2(data));