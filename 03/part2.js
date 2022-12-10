const fs = require('fs');

const lines = fs.readFileSync('./input', 'utf8').split('\n');

const letterMap = (letters) => {
  const map = {};

  for (const letter of letters.split('')) {
    map[letter] = true;
  }

  return map;
}

let score = 0;
let linesParsed = 0;

let letterMapOverlap = null;

for (const line of lines) {
  const letters = letterMap(line);

  if (letterMapOverlap === null) {
    letterMapOverlap = letters;
  } else {
    const newMapOverlap = {};

    for (const letter of Object.keys(letters)) {
      if (letterMapOverlap[letter]) {
        newMapOverlap[letter] = true;
      }
    }

    letterMapOverlap = newMapOverlap;
  }

  linesParsed++;

  if (linesParsed === 3) {
    const charCode = Object.keys(letterMapOverlap)[0].charCodeAt(0);

    if (charCode < 'a'.charCodeAt(0)) {
      score += charCode - 'A'.charCodeAt(0) + 27;
    } else {
      score += charCode - 'a'.charCodeAt(0) + 1;
    }

    letterMapOverlap = null;
    linesParsed = 0;
  }
}

console.log(score);
