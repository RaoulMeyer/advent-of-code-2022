const fs = require('fs');

const lines = fs.readFileSync('./input', 'utf8').trim().split('\n');

const caves = new Map();

for (const line of lines) {
  const parts = line.split(' ');

  const key = parts[1];
  const rate = Number(parts[4].replaceAll(/[^\d^-]+/g, ''));

  const tunnels = line.split('to valve').pop().split(' ').slice(1).map(str => str.trim().replace(',', ''));

  caves.set(key, {
    rate,
    tunnels
  });
}

let maxReleased = 0;

const releasedAtStep = {};
const margin = 100;

const queue = [{
  cave: 'AA',
  steps: 0,
  released: 0,
  open: [],
  previousMove: null,
}];

while (queue.length > 0) {
  const current = queue.shift();
  const cave = caves.get(current.cave);

  releasedAtStep[current.steps] = Math.max(releasedAtStep[current.steps] || 0, current.released);

  if (releasedAtStep[current.steps] - margin > current.released) {
    continue;
  }

  const newReleased = current.released + current.open.reduce((acc, c) => acc + caves.get(c).rate, 0);

  if (current.steps === 30) {
    maxReleased = Math.max(maxReleased, current.released);

    continue;
  }

  const options = [];

  if (!current.open.includes(current.cave) && cave.rate > 0) {
    options.push({
      cave: current.cave,
      steps: current.steps + 1,
      released: newReleased,
      open: [...current.open, current.cave],
      previousMove: null,
    });
  }

  for (const accessibleCave of cave.tunnels) {
    if (accessibleCave === current.previousMove) {
      continue;
    }

    options.push({
      cave: accessibleCave,
      steps: current.steps + 1,
      released: newReleased,
      open: current.open,
      previousMove: current.cave,
    });
  }

  queue.push(...options);
}

console.log(maxReleased);
