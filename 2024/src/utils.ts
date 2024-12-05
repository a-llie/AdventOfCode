import { readFileSync } from "fs"

export function removeLineBreaks(file: string): string[] {
    return readFile(file).replace(/[\n\r]/g, ' ').split(" ").filter((val) => val !== '')
}

export function splitByLineBreak(file: string): string[] {
    return readFile(file).replace(/[\r]/g, '').split(/[\n]/g,);
}

export function numLineToNumArray(line: string): number[] {
    return line.split(' ').map((strNum) => parseInt(strNum));
}

export function readFile(file: string): string {
    return readFileSync(file, 'utf-8');
}

export function filterRegMatches(regExp: RegExp, data: string): string[] {
    const matches: string[] = [];
    let match;
    while ((match = regExp.exec(data)) !== null) {
        matches.push(match[0]);
    }
    return matches;
}
