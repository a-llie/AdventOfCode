const fs = require('fs');

const RED = 12;
const GREEN = 13;
const BLUE = 14;

function ImportFile(fileName)
{
    var games = new Object();
    var file = fs.readFileSync(fileName, 'utf8');
    var lines = file.split("\n");

    for (let i = 0; i < lines.length; i++)
    {
        let line = lines[i];
        let split_data = line.split(": ");
        let id = split_data[0].split(" ")[1];
        let subsets = split_data[1];
        games[id] = new Object();
        let subgames = subsets.split(";");
        games[id] = new Array();
        for (let i = 0; i < subgames.length; i++) 
        {
          let colours = subgames[i].split(",");
          games[id].push({ red : 0, green : 0, blue : 0 });

          colours.forEach(colour => {
            if (colour.startsWith(" "))
            {
              colour = colour.substring(1);
            }
            colour = colour.replace((/\r/gm), '');
            games[id][i][colour.split(" ")[1]] = Number(colour.split(" ")[0]);
          });
        }
    }
    return games;
}

function PartOne(input) {

    let sum = 0;
    let games = Object.keys(input);
    games.forEach(g => {
      let valid = true; 
      let game = input[g];
      for (let i = 0; i < game.length; i++)
      {
        if (game[i]["red"] > RED || game[i]["green"] > GREEN || game[i]["blue"] > BLUE)
        {
          valid = false;
          break;
        }
      }
      if (valid)
      {
        sum += Number([g]);
      }
    });
    return sum;
}
  
function PartTwo(input) {
    let sum = 0;
    let games = Object.keys(input);
    games.forEach(g => {
      let game = input[g];
      let smallest_red = 0;
      let smallest_green = 0;
      let smallest_blue = 0;

      for (let i = 0; i < game.length; i++)
      {
        if (game[i]["red"] > smallest_red)
        {
          smallest_red = game[i]["red"];
        }
        if (game[i]["green"] > smallest_green)
        {
          smallest_green = game[i]["green"];
        }
        if (game[i]["blue"] > smallest_blue)
        {
          smallest_blue = game[i]["blue"];
        }
      }
      sum += smallest_red * smallest_green * smallest_blue;
    });
    return sum;
}

let data = ImportFile("text.txt");
console.log(PartOne(data));
console.log(PartTwo(data));

