const fs = require('fs');

const baseCharCode = 'a'.charCodeAt(0);

const grid = fs.readFileSync('./input', 'utf8').trim().split('\n').map(line => line.split('').map(letter => letter.charCodeAt(0) - baseCharCode));

let start;
let end;

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[0].length; j++) {
    if (grid[i][j] === 'S'.charCodeAt(0) - baseCharCode) {
      start = [i, j];
      grid[i][j] = 0;
    }
    if (grid[i][j] === 'E'.charCodeAt(0) - baseCharCode) {
      end = [i, j];
      grid[i][j] = 'z'.charCodeAt(0) - baseCharCode;
    }
  }
}

const queue = [
  {
    position: start,
    steps: 0
  }
];

const visited = {};

while (queue.length > 0) {
  const { position, steps } = queue.pop();
  const value = grid[position[0]][position[1]];

  visited[`${position[0]},${position[1]}`] = steps;

  const options = [[-1, 0], [1, 0], [0, -1], [0, 1]].map(move => {
    const otherX = position[0] + move[0];
    const otherY = position[1] + move[1];

    if (grid[otherX] === undefined || grid[otherX][otherY] === undefined) {
      return null;
    }

    const otherValue = grid[otherX][otherY];

    if (otherValue - value > 1) {
      return null;
    }

    if (visited[`${otherX},${otherY}`] !== undefined && visited[`${otherX},${otherY}`] <= steps + 1) {
      return null;
    }

    return move;
  }).filter(Boolean);

  for (const [x, y] of options) {
    queue.push({
      position: [position[0] + x, position[1] + y],
      steps: steps + 1,
    });
  }
}

console.log(visited[`${end[0]},${end[1]}`]);
