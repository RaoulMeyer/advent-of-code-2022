const fs = require('fs');

const lines = fs.readFileSync('./input', 'utf8').split('\n');

const elves = [];

let runningSum = 0;

for (const line of lines) {
  if (line.trim() === '') {
    elves.push(runningSum);
    runningSum = 0;

    continue;
  }

  runningSum += Number(line);
}

elves.push(runningSum);

console.log(Math.max(...elves));
