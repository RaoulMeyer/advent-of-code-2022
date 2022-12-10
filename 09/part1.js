const fs = require('fs');

const lines = fs.readFileSync('./input', 'utf8').trim().split('\n');

const commands = lines.map(line => {
  const [direction, amount] = line.split(' ');

  return new Array(Number(amount)).fill(direction);
}).flat();

const head = { x: 0, y: 0};
const tail = { x: 0, y: 0};

const visited = {};

for (const command of commands) {
  visited[`${tail.x},${tail.y}`] = true;

  switch (command) {
    case 'R':
      head.x += 1;
      if (head.x - tail.x === 2) {
        tail.x = (head.x + tail.x) / 2;
        tail.y = head.y;
      }
      break;
    case 'L':
      head.x -= 1;
      if (head.x - tail.x === -2) {
        tail.x = (head.x + tail.x) / 2;
        tail.y = head.y;
      }
      break;
    case 'U':
      head.y += 1;
      if (head.y - tail.y === 2) {
        tail.y = (head.y + tail.y) / 2;
        tail.x = head.x;
      }
      break;
    case 'D':
      head.y -= 1;
      if (head.y - tail.y === -2) {
        tail.y = (head.y + tail.y) / 2;
        tail.x = head.x;
      }
      break;
  }

  visited[`${tail.x},${tail.y}`] = true;
}

console.log(Object.keys(visited).length);
