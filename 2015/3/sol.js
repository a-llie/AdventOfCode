const fs = require('fs');

function ImportFile(fileName)
{
    var file = fs.readFileSync(fileName, 'utf8');
    return file;
}

function PartOne(data) {
    let locations = {"0,0": 1};

    let current_location = [0,0];
    for (let i = 0; i < data.length; i++) {
        if (data.charAt(i) === '>')
        {
            current_location[0] += 1;
        }
        else if (data.charAt(i) === '<')
        {
            current_location[0] -= 1;
        }
        else if (data.charAt(i) === '^')
        {
            current_location[1] += 1;
        }
        else if (data.charAt(i) === 'v')
        {
            current_location[1] -= 1;
        }

        if(!locations.hasOwnProperty(current_location.toString()))
        {
            locations[current_location.toString()] = 1;
        }
        else 
        {
            locations[current_location.toString()] += 1;
        }
    }

    return Object.keys(locations).length;
}

function PartTwo(data) {
    let locations = {"0,0": 1}

    let current_location = [0,0];
    let robo_location = [0,0];
    for (let i = 0; i < data.length; i++) {
        let active = i % 2 === 0 ? current_location : robo_location;
        switch(data.charAt(i)) {
            case '>':
                active[0] += 1;
                break;
            case '<':
                active[0] -= 1;
                break;
            case '^':
                active[1] += 1;
                break;
            case 'v':
                active[1] -= 1;
                break;
        }

        if(!locations.hasOwnProperty(current_location.toString()))
            locations[current_location.toString()] = 1;
        else 
            locations[current_location.toString()] += 1;
        if (!locations.hasOwnProperty(robo_location.toString()))
            locations[robo_location.toString()] = 1;
        else
            locations[robo_location.toString()] += 1;
    }

    return Object.keys(locations).length;
}

let data = ImportFile("text.txt");
console.log(PartOne(data));
console.log(PartTwo(data));


