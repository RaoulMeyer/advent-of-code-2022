const fs = require('fs');

const lines = fs.readFileSync('./input', 'utf8').split('\n');

let points = 0;

const win = {
  X: 'C',
  Y: 'A',
  Z: 'B'
};

const draw = {
  X: 'A',
  Y: 'B',
  Z: 'C'
}

for (const line of lines) {
  const [pickA, pickB] = line.split(' ');

  if (pickA === draw[pickB]) {
    points += 3
  } else {
    points += win[pickB] === pickA ? 6 : 0;
  }

  points += Object.keys(win).indexOf(pickB) + 1;
}

console.log(points);
