const fs = require('fs');
function ImportFile(fileName)
{
    var file = fs.readFileSync(fileName, 'utf8');
    lines = file.split("\n");

    let instructions = new Object();
    lines.forEach(line => {
        let type = "";
        if (line.includes("toggle"))
        {
            type = line.split(" ")[0];
            starting_split = 1;
        }
        else
        {
            type = line.split(" ")[1];
            starting_split = 2;
        }

        let start = [parseInt(line.split(" ")[starting_split].split(",")[0]), parseInt(line.split(" ")[starting_split].split(",")[1])];
        let end = [parseInt(line.split(" ")[starting_split + 2].split(",")[0]), parseInt(line.split(" ")[starting_split + 2].split(",")[1])];
        instructions[line] = {type: type, start: start, end: end};
    });
    let lights = new Array();
    for (let i = 0; i < 1000; i++) {
        lights.push(new Array());
        for (let j = 0; j < 1000; j++) {
            lights[i][j] = [false,0];
        }
    }

    let data = new Object();
    data.lights = lights;
    data.instructions = instructions;
    return data;
}

function PartOne(data) 
{
    let instructions = Object.keys(data.instructions);
    instructions.forEach(ins => {
        let type = data.instructions[ins].type;
        let start = data.instructions[ins].start;
        let end = data.instructions[ins].end;
        for (let i = start[0]; i <= end[0]; i++) {
            for (let j = start[1]; j <= end[1]; j++) {
                if (type === "toggle")
                {
                    data.lights[i][j][0] = !data.lights[i][j][0];
                    data.lights[i][j][1] += 2;
                }
                else if (type === "on")
                {
                    data.lights[i][j][0] = true;
                    data.lights[i][j][1]++;
                }
                else if (type === "off")
                {
                    data.lights[i][j][0] = false;
                    data.lights[i][j][1]--;
                    if (data.lights[i][j][1] < 0) data.lights[i][j][1] = 0;
                }
            }
        }
    });
    let on_lights = 0;
    let brightness = 0;
    data.lights.forEach(light => {
        light.forEach(l => {
            brightness += l[1];
            if (l[0]) on_lights++;            
        });
    });
    return {on_lights, brightness};
}

let data = ImportFile("text.txt");
console.log(PartOne(data));


