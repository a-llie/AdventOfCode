import { readFileSync } from "fs"

export function removeLineBreaks(file: string): string[] {
    return readFileSync(file, 'utf-8').replace(/[\n\r]/g, ' ').split(" ").filter((val) => val !== '')
}

export function splitByLineBreak(file: string): string[] {
    return readFileSync(file, 'utf-8').replace(/[\r]/g, '').split(/[\n]/g,);
}


export function numLineToNumArray(line: string): number[] {
    return line.split(' ').map((strNum) => parseInt(strNum));
}