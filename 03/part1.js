const fs = require('fs');

const lines = fs.readFileSync('./input', 'utf8').trim().split('\n');

const letterMap = (letters) => {
  const map = {};

  for (const letter of letters.split('')) {
    map[letter] = true;
  }

  return map;
}

let score = 0;

for (const line of lines) {
  const [bag1, bag2] = [line.slice(0, line.length / 2), line.slice(line.length / 2)];

  const letters1 = letterMap(bag1);
  const letters2 = letterMap(bag2);

  for (const letter of Object.keys(letters1)) {
    if (letters2[letter]) {
      const charCode = letter.charCodeAt(0);

      if (charCode < 'a'.charCodeAt(0)) {
        score += charCode - 'A'.charCodeAt(0) + 27;
      } else {
        score += charCode - 'a'.charCodeAt(0) + 1;
      }

      break;
    }
  }
}

console.log(score);
