const fs = require('fs');

function ImportFile(fileName)
{
    var file = fs.readFileSync(fileName, 'utf8');
    var lines = file.split("\n");
    let data = new Array();

    lines.forEach(function (line) {
        line = line.trim(); 
        let dim = line.split("x");
        data.push([parseInt(dim[0]), parseInt(dim[1]), parseInt(dim[2])]);
    });
    return data;
}

function PartOne(data) {
    let sum = 0; 

    data.forEach(function(dim) {
    
        let lw = dim[0] * dim[1];
        let wh = dim[1] * dim[2];
        let hl = dim[2] * dim[0];
        let wp = (2*lw) + (2*wh) + (2*hl);
        let slack = Math.min(lw, wh, hl);
        sum += wp + slack;
    });
    return sum;
}

function PartTwo(data) {
    let sum = 0; 

    data.forEach(function(dim) {
    
        let volume = dim[0] * dim[1] * dim[2];
        let p1 = Math.min(dim[0], dim[1], dim[2]);
        dim.splice(dim.indexOf(p1), 1);
        let p2 = Math.min(dim[0], dim[1]);
        console.log(p1, p2);
        sum += volume + (2*p1) + (2*p2);
    });
    return sum;
}

let data = ImportFile("text.txt");
console.log(PartOne(data));
console.log(PartTwo(data));


