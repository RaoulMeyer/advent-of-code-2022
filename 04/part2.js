const fs = require('fs');

const lines = fs.readFileSync('./input', 'utf8').trim().split('\n');

let overlap = 0;

for (const line of lines) {
  const [[start1, end1], [start2, end2]] = line.split(',').map(r => r.split('-').map(Number));

  if (start2 <= end1 && end2 >= start1 || start1 <= end2 && end1 >= start2) {
    overlap++;
  }
}

console.log(overlap);
