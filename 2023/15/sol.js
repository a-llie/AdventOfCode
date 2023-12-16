const fs = require('fs');

function ImportFile(fileName)
{
    var file = fs.readFileSync(fileName, 'utf8');
    var seqs = file.split(",");
    return seqs;
}

function Part1(data)
{
    let sum = 0;
    for(let i = 0; i < data.length; i++)
    {
        let inner_sum = 0;
        for (let j = 0; j < data[i].length; j++)
        {
            
            inner_sum+= (data[i].charCodeAt(j));
            inner_sum *= 17;
            inner_sum %= 256;
    
            
        }
        sum += inner_sum;
    }
    return sum;
}

function Part2(data)
{
    let boxes = new Object();
    for(let i = 0; i < data.length; i++)
    {
        let action = "";
        let value = null;
        if (data[i].includes("="))
        {
            action = "=";
            value = data[i].split(action)[1];
        }
        else 
        {
            action = "-";
        }
        let key = data[i].split(action)[0];

        let box = 0;
        for (let j = 0; j < key.length; j++)
        {
            box += key.charCodeAt(j);
            box *= 17;
            box %= 256;
        }
        switch (action)
        {
            case "=":
                if (!boxes[box]) boxes[box] = {max : 0}; 
                if (!boxes[box][key]) boxes[box][key] = [value, boxes[box].max++];
                else boxes[box][key][0] = value;
                break;
            case "-":
                if (boxes[box]) delete boxes[box][key];
                break;
        }
    }
    let sum = 0;
    let box_keys = Object.keys(boxes);
    let boxes_array = new Object();
    for (let i = 0; i < box_keys.length; i++)
    {
        let sub_box = JSON.parse(JSON.stringify(boxes[box_keys[i]]));
        delete sub_box.max;

        let sub_keys = Object.keys(sub_box);
        boxes_array[box_keys[i]] = sub_keys.sort((a, b) => sub_box[a][1] - sub_box[b][1]);

        for (let j = 0; j < boxes_array[box_keys[i]].length; j++)
        {
            let box = (1 + parseInt(box_keys[i]));
            let slot = (1 + boxes_array[box_keys[i]].indexOf(boxes_array[box_keys[i]][j]));
            let focal = (parseInt(boxes[box_keys[i]][boxes_array[box_keys[i]][j]][0]));
            sum+= (box * slot * focal);
        }
    }
    return sum;
}


let data = ImportFile("text.txt");
console.log(Part1(data));
console.log(Part2(data));