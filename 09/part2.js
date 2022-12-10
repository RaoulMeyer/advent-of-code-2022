const fs = require('fs');

const lines = fs.readFileSync('./input', 'utf8').trim().split('\n');

const commands = lines.map(line => {
  const [direction, amount] = line.split(' ');

  return new Array(Number(amount)).fill(direction);
}).flat();

const parts = new Array(10).fill(null).map(() => ({ x: 0, y: 0}));
const head = parts[0];
const tail = parts[9];

const visited = {};

for (const command of commands) {
  visited[`${tail.x},${tail.y}`] = true;

  switch (command) {
    case 'R':
      head.x += 1;
      break;
    case 'L':
      head.x -= 1;
      break;
    case 'U':
      head.y += 1;
      break;
    case 'D':
      head.y -= 1;
      break;
  }

  for (const [index, part] of Object.entries(parts)) {
    if (part === head) {
      continue;
    }

    const previous = parts[index - 1];

    if (Math.abs(previous.x - part.x) === 2 && Math.abs(previous.y - part.y) === 2) {
      part.x = (previous.x + part.x) / 2;
      part.y = (previous.y + part.y) / 2;
    } else {
      if (previous.x - part.x >= 2) {
        part.x = previous.x - 1;
        part.y = previous.y;
      }
      if (previous.x - part.x <= -2) {
        part.x = previous.x + 1;
        part.y = previous.y;
      }
      if (previous.y - part.y >= 2) {
        part.y = previous.y - 1;
        part.x = previous.x;
      }
      if (previous.y - part.y <= -2) {
        part.y = previous.y + 1;
        part.x = previous.x;
      }
    }
  }

  visited[`${tail.x},${tail.y}`] = true;
}

console.log(Object.keys(visited).length);
