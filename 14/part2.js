const fs = require('fs');

const lines = fs.readFileSync('./input', 'utf8').trim().split('\n');

const grid = {};

let maxDepth = 0;

const toKey = ([x, y]) => `${x},${y}`;

for (const line of lines) {
  const coords = line.split(' -> ').map(coord => coord.split(',').map(Number));

  const pairs = [];

  for (const [index, coord] of Object.entries(coords)) {
    const nextCoord = coords[Number(index) + 1];
    if (nextCoord === undefined) {
      break;
    }

    pairs.push([coord, nextCoord]);
  }

  for (const pair of pairs) {
    if (pair[0][0] === pair[1][0]) {
      const min = Math.min(pair[0][1], pair[1][1]);
      const max = Math.max(pair[0][1], pair[1][1]);

      for (let i = min; i <= max; i++) {
        grid[toKey([pair[0][0], i])] = true;
        maxDepth = Math.max(maxDepth, i);
      }
    } else {
      const min = Math.min(pair[0][0], pair[1][0]);
      const max = Math.max(pair[0][0], pair[1][0]);

      maxDepth = Math.max(maxDepth, pair[0][1]);

      for (let i = min; i <= max; i++) {
        grid[toKey([i, pair[0][1]])] = true;
      }
    }
  }
}

let shouldContinue = true;
let sandCount = 0;

while (shouldContinue) {
  let sand = [500, 0];
  grid[toKey(sand)] = true;
  sandCount++;

  let isFalling = true;

  while (isFalling) {
    const moves =
        [[0, 1], [-1, 1], [1, 1]]
          .map(move => [sand[0] + move[0], sand[1] + move[1]])
          .filter(newPosition => grid[toKey(newPosition)] === undefined)
          .filter(newPosition => newPosition[1] < maxDepth + 2);

    if (moves.length === 0) {
      isFalling = false;

      if (sand[1] === 0) {
        shouldContinue = false;
      }
      break;
    }

    delete grid[toKey(sand)];

    sand = moves[0];

    grid[toKey(sand)] = true;
  }
}

console.log(sandCount);
