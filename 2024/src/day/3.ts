import { readFile, filterRegMatches } from "../utils.js";

function part1(data: string): number {
    const re = new RegExp(/mul\([0-9]{1,10},[0-9]{1,10}\)/, "g");

    const matches: string[] = filterRegMatches(re, data);

    let sum = 0;

    for (const m of matches) {
        const nums = new RegExp(/[0-9]{1,10},[0-9]{1,10}/).exec(m);
        if (nums) {
            const vals = nums[0].split(",");
            sum += parseInt(vals[0]) * parseInt(vals[1]);
        }
    }

    return sum;
}


function part2(data: string): number {
    const re = new RegExp(/do\(\)|don't\(\)|mul\([0-9]{1,10},[0-9]{1,10}\)/, "g");

    const matches: string[] = filterRegMatches(re, data);
    let sum = 0;
    let active = true; 

    for (const m of matches) {
        switch(m)
        {
            case "do()":
                active = true;
                continue;
            case "don't()": 
                active = false;
                continue;
            default:
                break;
        }
        
        if (!active)
        {
            continue; 
        }

        const nums = new RegExp(/[0-9]{1,10},[0-9]{1,10}/).exec(m);
        if (nums) {
            const vals = nums[0].split(",");
            sum += parseInt(vals[0]) * parseInt(vals[1]);
        }
    }
    return sum;
}

const str = readFile('src/assets/3.txt');
console.log(part1(str));
console.log(part2(str));