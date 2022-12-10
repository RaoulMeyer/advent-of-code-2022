const fs = require('fs');

const lines = fs.readFileSync('./input', 'utf8').trim().split('\n');

const commands = lines.map(line => line === 'noop' ? '' : ['', line]).flat();

let value = 1;
const pixels = [];

for (const [index, command] of Object.entries(commands)) {
  if (Math.abs(value - (Number(index) % 40)) <= 1) {
    pixels.push('#');
  } else {
    pixels.push('.');
  }

  if (!command) {
    continue;
  }

  const [, amount] = command.split(' ').map(Number);

  value += amount;
}

for (const [index, pixel] of Object.entries(pixels)) {
  process.stdout.write(pixel);

  if (Number(index) % 40 === 39) {
    process.stdout.write('\n');
  }
}
