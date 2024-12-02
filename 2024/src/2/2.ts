import { splitByLineBreak, numLineToNumArray } from "../utils.js";

function setup() {
    return splitByLineBreak('src/assets/2.txt').map((strNums) => numLineToNumArray(strNums));
}


function part1(data: Array<Array<number>>): number {

    let safeLevels = 0;
    for (const report of data) {
        safeLevels += safeLevel(report) ? 1 : 0;
    }
    return safeLevels;
}


function part2(data: Array<Array<number>>): number {
    let safeLevels = 0;
    for (const report of data) {
        let safe = false;
        for (let i = 0; i < report.length; i++) {
            let removeOneReport: number[] = JSON.parse(JSON.stringify(report));
            removeOneReport.splice(i, 1);
            if (safeLevel(removeOneReport)) {
                safe = true;
                break;
            }
        }
        safeLevels += safe ? 1 : 0;
    }
    return safeLevels;
}

function safeLevel(report: Array<number>): boolean {
    let safe = true;
    let ascendingInit = report[0] > report[1] ? true : false;

    for (let i = 0; i < report.length - 1; i++) {
        let ascending = report[i] > report[i + 1] ? true : false;
        if (ascendingInit !== ascending || ![1,2,3].includes(Math.abs(report[i] - report[i + 1]))) {
            safe = false;
            break;
        }
    }
    return safe;
}

const data = setup();
console.log(part1(data));
console.log(part2(data));




