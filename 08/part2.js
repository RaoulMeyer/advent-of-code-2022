const fs = require('fs');

const grid = fs.readFileSync('./input', 'utf8').trim().split('\n').map(line => line.split('').map(Number));

const scenicScore = (x, y) => {
  const height = grid[x][y];

  let left = 0;

  for (let i = x - 1; i >= 0; i--) {
    if (grid[i][y] === undefined) {
      break;
    }

    left++;

    if (grid[i][y] >= height) {
      break;
    }
  }

  let right = 0;

  for (let i = x + 1; i < grid.length; i++) {
    if (grid[i][y] === undefined) {
      break;
    }

    right++;

    if (grid[i][y] >= height) {
      break;
    }
  }

  let top = 0;

  for (let i = y - 1; i >= 0; i--) {
    if (grid[x][i] === undefined) {
      break;
    }

    top++;

    if (grid[x][i] >= height) {
      break;
    }
  }

  let bottom = 0;

  for (let i = y + 1; i < grid.length; i++) {
    if (grid[x][i] === undefined) {
      break;
    }

    bottom++;

    if (grid[x][i] >= height) {
      break;
    }
  }

  return left * right * top * bottom;
};

let maxScore = 0;

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    const score = scenicScore(i, j);

    if (score > maxScore) {
      maxScore = score;
    }
  }
}

console.log(maxScore);
