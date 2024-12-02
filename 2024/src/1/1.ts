import { removeLineBreaks } from "../utils.js";

function setup(): { arr1: number[], arr2: number[] } {
    const file = removeLineBreaks('src/assets/1.txt').map((num) => parseInt(num));

    const arr1: number[] = [];
    const arr2: number[] = [];

    for (let i = 0; i < file.length; i += 2) {
        arr1.push(file[i]);
        arr2.push(file[i + 1]);
    }

    arr1.sort();
    arr2.sort();

    return { arr1, arr2 };
}


function part1(arr1: number[], arr2: number[]) {
    let count = 0;

    for (let i = 0; i < arr1.length; i++) {
        count += Math.max(arr1[i], arr2[i]) - Math.min(arr1[i], arr2[i]);
    }
    return count;
}


function part2(arr1: number[], arr2: number[]) {
    let count = 0;

    for (let i = 0; i < arr1.length; i++) {
        count += arr1[i] * arr2.filter((num: number) => num === arr1[i]).length;
    }
    return count;
}


const { arr1, arr2 } = setup();

console.log(part1(arr1, arr2));
console.log(part2(arr1, arr2));




