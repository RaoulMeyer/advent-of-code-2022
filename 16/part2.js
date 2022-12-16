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

const maxOpen = [...caves.values()].filter(value => value.rate > 0).length;

let maxReleased = 0;
let maxStep = 0;

const releasedAtStep = {};
const margin = 20;

const queue = [{
  cave: 'AA',
  elephantCave: 'AA',
  steps: 0,
  released: 0,
  open: [],
  previousMove: null,
  previousElephantMove: null,
}];

while (queue.length > 0) {
  const current = queue.shift();
  const cave = caves.get(current.cave);
  const elephantCave = caves.get(current.elephantCave);

  releasedAtStep[current.steps] = Math.max(releasedAtStep[current.steps] || 0, current.released);

  if (releasedAtStep[current.steps] - margin > current.released) {
    continue;
  }

  const newReleased = current.released + current.open.reduce((acc, c) => acc + caves.get(c).rate, 0);

  if (current.steps > maxStep) {
    maxStep = current.steps;
    console.log(current.steps);
  }

  if (current.steps === 26) {
    maxReleased = Math.max(maxReleased, current.released);

    continue;
  }

  if (current.open.length === maxOpen) {
    queue.push({
      cave: current.cave,
      elephantCave: current.elephantCave,
      steps: current.steps + 1,
      released: newReleased,
      open: current.open,
      previousMove: null,
      previousElephantMove: null,
    });

    continue;
  }

  const options = [];

  const canOpen = !current.open.includes(current.cave) && cave.rate > 0;
  const canElephantOpen = !current.open.includes(current.elephantCave) && elephantCave.rate > 0 && !(canOpen && current.cave === current.elephantCave);

  const moves = cave.tunnels.filter(tunnel => tunnel !== current.previousMove);
  const elephantMoves = elephantCave.tunnels.filter(tunnel => tunnel !== current.previousElephantMove);

  if (canOpen && canElephantOpen) {
    options.push({
      cave: current.cave,
      elephantCave: current.elephantCave,
      steps: current.steps + 1,
      released: newReleased,
      open: [...current.open, current.cave, current.elephantCave],
      previousMove: null,
      previousElephantMove: null,
    });
  }

  if (canOpen) {
    for (const move of elephantMoves) {
      options.push({
        cave: current.cave,
        elephantCave: move,
        steps: current.steps + 1,
        released: newReleased,
        open: [...current.open, current.cave],
        previousMove: null,
        previousElephantMove: current.elephantCave,
      });
    }
  }

  if (canElephantOpen) {
    for (const move of moves) {
      options.push({
        cave: move,
        elephantCave: current.elephantCave,
        steps: current.steps + 1,
        released: newReleased,
        open: [...current.open, current.elephantCave],
        previousMove: current.cave,
        previousElephantMove: null,
      });
    }
  }

  for (const move of moves) {
    for (const elephantMove of elephantMoves) {
      options.push({
        cave: move,
        elephantCave: elephantMove,
        steps: current.steps + 1,
        released: newReleased,
        open: current.open,
        previousMove: current.cave,
        previousElephantMove: current.elephantCave,
      });
    }
  }

  queue.push(...options);
}

console.log(maxReleased);
