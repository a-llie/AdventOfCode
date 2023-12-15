const fs = require('fs');
const hash=require("shark-hashlib");

function ImportFile(fileName)
{
    var file = fs.readFileSync(fileName, 'utf8');
    return file;
}

function PartOne(data, prefix) {
    let string = "";
    let count = 0;
    while(!string.startsWith(prefix)) {
        count++;
        string = hash(2,data + count);
    }
    return count;
}

let data = ImportFile("text.txt");
console.log(PartOne(data, "00000"));
console.log(PartOne(data, "000000"));


