const fs = require('fs');

const lines = fs.readFileSync('./input', 'utf8').trim().split('\n');

let fullOverlap = 0;

for (const line of lines) {
  const [range1, range2] = line.split(',');

  const [start1, end1] = range1.split('-').map(Number);
  const [start2, end2] = range2.split('-').map(Number);

  const secondIncludesFirst = start2 <= start1 && end1 <= end2;
  const firstIncludesSecond = start1 <= start2 && end2 <= end1;

  if (firstIncludesSecond || secondIncludesFirst) {
    fullOverlap++;
  }
}

console.log(fullOverlap);
