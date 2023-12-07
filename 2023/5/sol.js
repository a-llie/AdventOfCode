const fs = require('fs');

function ImportFile(fileName)
{
    var file = fs.readFileSync(fileName, 'utf8');
    var lines = file.split("\n");

    let subsections = new Array();
    subsections.push(new Array());
    lines.forEach(line => {
        if (line !== '\r')
        {
          line = line.replace(/\r/gm, '');
          subsections[subsections.length-1].push(line);
        }
        else
        {
          subsections.push(new Array());
        }
    });

    let rules = new Object();

    for (let i = 0; i < subsections.length; i++) {
      let key = "";
      for (let j = 0; j < subsections[i].length; j++) {
        
        if (j === 0)
        {
          key = subsections[i][j].split(":")[0];
          if (i === 0)
          {
            rules[key] = CleanArray(subsections[i][j].split(":")[1].split(" "), '').map(x => parseInt(x));
          }
          else 
          {
            rules[key] = new Object();

            for (let k = 0; k < subsections[i].length -1; k++) {
              rules[key][k] = new Object();
            }
          }
        }
        else
        {
          rules[String(key)][j-1]["drs"] = (parseInt(subsections[i][j].split(" ")[0]));
          rules[String(key)][j-1]["srs"] = (parseInt(subsections[i][j].split(" ")[1]));
          rules[String(key)][j-1]["rl"] = (parseInt(subsections[i][j].split(" ")[2]));
        }
      }
    }
    return rules;
}

function PartOne(input)
{
  let seeds = new Object();

  input['seeds'].forEach(seed => {

      seeds[seed] = new Object();
      seeds[seed]["seed"] = seed;
  }); 

  let conversion_keys = Object.keys(input).filter(x => x !=='seeds');
  let conversion_chart = new Object();

  conversion_keys.forEach(key => {
    let from = key.split("-")[0]
    let to = key.split("-")[2].split(" ")[0];
    conversion_chart[key] = new Object();

    let charts = Object.keys(input[key]);
    charts.forEach(chart => { 
      conversion_chart[key][chart] = new Object();
      conversion_chart[key][chart]['mappings'] = new Object();
      conversion_chart[key][chart]['covered'] = new Object()
      let range = input[key][chart].rl;
      conversion_chart[key][chart]['mappings']['min'] = input[key][chart].drs;
      conversion_chart[key][chart]['mappings']['max'] = input[key][chart].drs + range-1;

      conversion_chart[key][chart]['covered']['min'] = input[key][chart].srs;
      conversion_chart[key][chart]['covered']['max'] = input[key][chart].srs + range-1;

      input['seeds'].forEach(seed => {  
        if (!seeds[seed][to])
        {
          seeds[seed][to] = seeds[seed][from];
        }
        if (seeds[seed][from] >= conversion_chart[key][chart]['covered']['min'] && seeds[seed][from] <= conversion_chart[key][chart]['covered']['max'])
        {
          seeds[seed][to] = seeds[seed][from] - (conversion_chart[key][chart]['covered']['min'] - conversion_chart[key][chart]['mappings']['min']);
        }
      });

    });
  });


  let lowest_location = null;
  
  input['seeds'].forEach(seed => {
    if (seeds[seed].location < lowest_location || lowest_location === null)
    {
      lowest_location = seeds[seed].location;
    }
    
  });
  return lowest_location; 
}

function PartTwo(input)
{
  let seeds = new Object();
  let seed_ranges = new Array();
  for (let i = 0; i < data.seeds.length; i+=2) {
    seed_ranges.push([data.seeds[i], data.seeds[i] + data.seeds[i+1]]);
  }
  input['seeds'].forEach(seed => {
      seeds[seed] = new Object();
      seeds[seed]["seed"] = seed;
  }); 

  let conversion_keys = Object.keys(input).filter(x => x !=='seeds');
  let conversion_chart = new Object();

  conversion_keys.forEach(key => {
    conversion_chart[key] = new Object();
    let charts = Object.keys(input[key]);
    charts.forEach(chart => { 
      conversion_chart[key][chart] = new Object();
      conversion_chart[key][chart]['mappings'] = new Object();
      conversion_chart[key][chart]['covered'] = new Object()
      let range = input[key][chart].rl;
      conversion_chart[key][chart]['mappings']['min'] = input[key][chart].drs;
      conversion_chart[key][chart]['mappings']['max'] = input[key][chart].drs + range-1;

      conversion_chart[key][chart]['covered']['min'] = input[key][chart].srs;
      conversion_chart[key][chart]['covered']['max'] = input[key][chart].srs + range-1;
    });
  });

  let keys = Object.keys(conversion_chart['humidity-to-location map']);
  conversion_keys.reverse();

  let highest_max = 0;
  let ranges = new Array();
  for (let m = 0; m < keys.length; m++) {
    {
      ranges.push([conversion_chart['humidity-to-location map'][keys[m]]['covered']['min'], conversion_chart['humidity-to-location map'][keys[m]]['covered']['max'], (conversion_chart['humidity-to-location map'][keys[m]]['mappings']['min'] - conversion_chart['humidity-to-location map'][keys[m]]['covered']['min']) ])
      if (conversion_chart['humidity-to-location map'][keys[m]]['mappings']['max'] > highest_max)
      {
        highest_max = conversion_chart['humidity-to-location map'][keys[m]]['mappings']['max'];
      }
    }
  }
    for (let i = 0; i <= highest_max; i++) 
      {
        let converted_val = null;
        let found = false;
        for (let j = 0; j < ranges.length; j++)
        {
          let range = ranges[j];
          converted_val = i - range[2];
          if (converted_val >= range[0] && converted_val <= range[1])
          {
            found = true;
            break;
          }
        }
        if (found === false) converted_val = i;

        conversion_keys.forEach(conversion_key => {
          let converted = false;
          if (conversion_key === 'humidity-to-location map') return;
          let the_keys = Object.keys(conversion_chart[conversion_key]);
          the_keys.forEach(the_key => {
            if (converted) return;
            let min_mapping = conversion_chart[conversion_key][the_key]['mappings']['min'];
            let max_mapping = conversion_chart[conversion_key][the_key]['mappings']['max'];
  
            if (converted_val <= max_mapping && converted_val >= min_mapping)
            {              
              converted_val = converted_val - (min_mapping - conversion_chart[conversion_key][the_key]['covered']['min']);
              converted = true;
              return;
            }
          });
        });

        for (let k = 0; k < seed_ranges.length; k++) 
        {
          let range = seed_ranges[k];
          if (converted_val >= range[0] && converted_val <= range[1])
          {
            return i;
          }
        }
      }
}

let data = ImportFile("text.txt");
console.log(PartOne(data));
console.log(PartTwo(data));

//helpers
function CleanArray(input, char)
{
  return input.filter(function (el) {
    return el !== char;
  });
}
