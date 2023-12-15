const fs = require('fs');

function ImportFile(fileName)
{
    var file = fs.readFileSync(fileName, 'utf8');
    return file;


}

function PartOne(data) {
    let floor = 0;
    let first_basement = null;
    for (let i = 0; i < data.length; i++)
    {
        if (data[i] == '(') floor++;
        else if (data[i] == ')') floor--;

        if (floor === -1 && first_basement === null) first_basement = i+1;
    }
    data.first_basement = first_basement;
    data.floor = floor;
    return {floor, first_basement};
}
  

let data = ImportFile("text.txt");
console.log(PartOne(data));

