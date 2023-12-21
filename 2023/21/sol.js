const fs = require('fs');

//borrowed this
class Queue {
  constructor() {
    this.items = {};
    this.headIndex = 0;
    this.tailIndex = 0;
  }

  enqueue(item) {
    this.items[this.tailIndex] = item;
    this.tailIndex++;
  }

  includes(item) {
    for (let i = this.headIndex; i < this.tailIndex; i++) {
      if (this.items[i] === item) return true;
    }
    return false;
  
  }

  dequeue() {
    this.#validate() // validate if not empty
    const item = this.items[this.headIndex];
    delete this.items[this.headIndex];
    this.headIndex++;
    return item;
  }

  peek() {
    this.#validate() // validate if not empty
    return this.items[this.headIndex];
  }

  #validate() { // validation logic
    if (this.headIndex === this.tailIndex) { 
      throw new Error('Cannot perform operation on an empty queue')
    }
  }

  get length() {
    return this.tailIndex - this.headIndex;
  }
}

const queue = new Queue();

function ImportFile(fileName)
{
    var file = fs.readFileSync(fileName, 'utf8');
    var lines = file.split("\n");
    var data = new Object();

    data.sums = new Object();
    data.needs_visited = new Set();
    for (let i = 0; i < lines.length; i++) {
      for (let j = 0; j < lines[i].length; j++) {
        if (lines[i][j] !== "." && lines[i][j] !== "S") continue;
        if (lines[i][j] === '\r') continue;
        data.needs_visited.add([i,j].toString());
        data[[i,j].toString()] = new Array();
        if (i !==0 && lines[i-1][j] !== "#") data[[i,j].toString()].push([i-1,j].toString());
        if (i !== lines.length-1 && lines[i+1][j] !== "#") data[[i,j].toString()].push([i+1,j].toString());
        if (j !==0 && lines[i][j-1] !== "#") data[[i,j].toString()].push([i,j-1].toString());
        if (j !== lines[i].length-1 && lines[i][j+1]&& lines[i][j+1] !== "#") data[[i,j].toString()].push([i,j+1].toString());
        if (lines[i][j] === "S")
          data.start = [i,j].toString();
      }
    }
    return data;   
}

function Part1(data, max)
{
  for (let i = 0; i < data[data.start].length; i++) {
    queue.enqueue([data[data.start][i], 1]);
  }

  let steps = 0; 
  while (data.needs_visited.size > 0) {
    if (queue.length === 0) break;
    if (queue.peek()[1] > max) break;
    steps++;
    if (data.needs_visited.has(queue.peek()[0]))
    {
      if (!data.sums[queue.peek()[0]] || data.sums[queue.peek()[0]] > queue.peek()[1] || data.sums[queue.peek()[0]] % 2 !== 0) data.sums[queue.peek()[0]] = queue.peek()[1];
      data.needs_visited.delete(queue.peek()[0]); 
      for (let i = 0; i < data[queue.peek()[0]].length; i++) {
        if (data.needs_visited.has(data[queue.peek()[0]][i])) queue.enqueue([data[queue.peek()[0]][i], queue.peek()[1]+1]);
      }
    } 
    queue.dequeue();
  }

  let keys = Object.keys(data.sums);
  let count = 0;

  for (let i = 0; i < keys.length; i++) {
    if (data.sums[keys[i]] % 2 === 0 && data.sums[keys[i]] <= max) count++;
  }
  return count;
}

function Part2(data, max)
{
  return "Part 2: TODO";
}

let data = ImportFile("text.txt");
console.log(Part1(data, 64));
console.log(Part2(data,26501365));