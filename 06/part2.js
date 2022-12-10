const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8').trim();

const lastLetters = [];
let index = 0;

for (const letter of input.split('')) {
  index++;

  lastLetters.unshift(letter);

  if (lastLetters.length > 14) {
    lastLetters.pop();
  }

  if (new Set(lastLetters).size === 14) {
    break;
  }
}

console.log(index);
