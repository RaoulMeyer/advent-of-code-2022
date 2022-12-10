const fs = require('fs');

const [startData, moves] = fs.readFileSync('./input', 'utf8').split('\n\n');

const stacks = [];

for (const line of startData.split('\n')) {
  if (line.substr(0, 3) === ' 1 ') {
    continue;
  }

  for (let i = 1; i < line.length; i += 4) {
    if (line.charAt(i).trim() === '') {
      continue;
    }

    const index = (i - 1) / 4;

    if (!stacks[index]) {
      stacks[index] = [];
    }

    stacks[index].unshift(line.charAt(i));
  }
}

for (const instruction of moves.trim().split("\n")) {
  const [, amount, , from, , to] = instruction.split(' ').map(Number);

  for (let i = 0; i < amount; i++) {
    stacks[to - 1].push(stacks[from - 1].pop());
  }
}

const top = stacks.map(stack => stack.pop()).join('');

console.log(top);
