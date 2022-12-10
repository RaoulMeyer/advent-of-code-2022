const fs = require('fs');

const lines = fs.readFileSync('./input', 'utf8').trim().split('\n');

let points = 0;

const flip = obj => Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key]));

const win = {
  X: 'C',
  Y: 'A',
  Z: 'B'
};

const draw = {
  X: 'A',
  Y: 'B',
  Z: 'C'
};

const lose = {
  X: 'B',
  Y: 'C',
  Z: 'A'
};

const resultMap = {
  X: flip(lose),
  Y: flip(draw),
  Z: flip(win)
};

for (const line of lines) {
  const [pickA, result] = line.split(' ');

  const pickB = resultMap[result][pickA];

  if (pickA === draw[pickB]) {
    points += 3
  } else {
    points += win[pickB] === pickA ? 6 : 0;
  }

  points += Object.keys(win).indexOf(pickB) + 1;
}

console.log(points);
