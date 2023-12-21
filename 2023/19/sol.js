const fs = require('fs');

function ImportFile(fileName)
{
 
    let data = new Object();
    var file = fs.readFileSync(fileName, 'utf8');
    var lines = file.split("\n");

    data.workflows = new Object();
    data.parts = new Array();

    let passed_split = false;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i] == "\r") {
        passed_split = true;
        continue;
      }
      if (!passed_split) {
        data.workflows[lines[i].split("{")[0]] = { conds : lines[i].split("{")[1].split("}")[0].replace(/\r/gm, '').split(",")};// (lines[i].split("{")[1].split("}")[0].replace(/\r/gm, ''));
      } else {
        data.parts.push([
          parseInt(lines[i].split("=")[1].split(",")[0]),
          parseInt(lines[i].split("=")[2].split(",")[0]),
          parseInt(lines[i].split("=")[3].split(",")[0]),
          parseInt(lines[i].split("=")[4].split("}")[0]),
        ]);//lines[i].replace(/\r/gm, ''));
      
      }
    }

    return data;
}

function PartOne(data) {
  let accepted = new Array();
  for (let i = 0; i < data.parts.length; i++) {
    let workflow = data.workflows["in"];

    if (Workflow(data, i, workflow))
    {
      accepted.push(data.parts[i]);
    }
  }

  let sum = 0;
  accepted.forEach(a => {
    sum += a.reduce((a, b) => a + b, 0);a
  });


  return sum;
}



function Workflow(data, p, workflow)
{
  let part = data.parts[p];
  for (let i = 0; i < workflow.conds.length; i++) {
    let cond = workflow.conds[i];
    let condition = null;
    if (!cond.includes("<") && !cond.includes(">")) {
      if (cond === 'A' ) return true;
      else if (cond === 'R') return false; 
      else return Workflow(data, p, data.workflows[cond]);
    }
    else 
    {
      let splitter = "";
      if (cond.includes("<")) splitter = "<";
      else splitter = ">";
      switch (cond[0])
      {
        case "x":
          if (splitter == "<") condition = (part[0] < parseInt(cond.split(splitter)[1].split(":")[0]));
          else condition = (part[0] > parseInt(cond.split(splitter)[1].split(":")[0]));
          break;
        case "m":
          if (splitter == "<") condition = (part[1] < parseInt(cond.split(splitter)[1].split(":")[0]));
          else condition = (part[1] > parseInt(cond.split(splitter)[1].split(":")[0]));
          break;
        case "a":
          if (splitter == "<") condition = (part[2] < parseInt(cond.split(splitter)[1].split(":")[0]));
          else condition= (part[2] > parseInt(cond.split(splitter)[1].split(":")[0]));
          break;
        case "s":
          if (splitter == "<") condition = (part[3] < parseInt(cond.split(splitter)[1].split(":")[0]));
          else condition = (part[3] > parseInt(cond.split(splitter)[1].split(":")[0]));
          break;
      }
      let success_cond = cond.split(":")[1];
      if (condition) 
      {
        if (success_cond === 'A') 
        {
          return true;
        }
        else if (success_cond === 'R')
        {
          return false;
        
        }
        else
        { 
          return Workflow(data, p, data.workflows[success_cond]);
        }
      } 
    }
  }
}
  



function PartTwo(data) {
    return "Part Two: TODO";


}

let data = ImportFile("text.txt");
console.log(PartOne(data));
console.log(PartTwo(data));