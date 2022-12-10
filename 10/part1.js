const fs = require('fs');

const lines = fs.readFileSync('./input', 'utf8').trim().split('\n');

const commands = lines.map(line => {
  if (line === 'noop') {
    return '';
  }

  return ['', line];
}).flat();

let value = 1;
let strengths = 0;

for (const [index, command] of Object.entries(commands)) {
  const oneIndex = Number(index) + 1;

  if ((oneIndex - 20) % 40 === 0) {
    strengths += oneIndex * value;
  }

  if (!command) {
    continue;
  }

  const [, amount] = command.split(' ').map(Number);

  value += amount;
}

console.log(strengths);
