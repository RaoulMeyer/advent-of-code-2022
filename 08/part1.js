const fs = require('fs');

const grid = fs.readFileSync('./input', 'utf8').trim().split('\n').map(line => line.split('').map(Number));

let visible = 0;

const isVisible = (x, y) => {
  const height = grid[x][y];

  let hidden = false;

  for (let i = 0; i < x; i++) {
    if (grid[i][y] >= height) {
      hidden = true;
    }
  }

  if (!hidden) {
    return true;
  }

  hidden = false;

  for (let i = x + 1; i < grid.length; i++) {
    if (grid[i][y] >= height) {
      hidden = true;
    }
  }

  if (!hidden) {
    return true;
  }

  hidden = false;

  for (let i = 0; i < y; i++) {
    if (grid[x][i] >= height) {
      hidden = true;
    }
  }

  if (!hidden) {
    return true;
  }

  hidden = false;

  for (let i = y + 1; i < grid.length; i++) {
    if (grid[x][i] >= height) {
      hidden = true;
    }
  }

  if (!hidden) {
    return true;
  }

  return false;
};

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (isVisible(i, j)) {
      visible++;
    }
  }
}

console.log(visible);
