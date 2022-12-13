const fs = require('fs');

const pairs = fs.readFileSync('./input', 'utf8').trim().split('\n\n');

const compare = (left, right) => {
  if (Array.isArray(left) !== Array.isArray(right)) {
    left = Array.isArray(left) ? left : [left];
    right = Array.isArray(right) ? right : [right];
  }

  if (!Array.isArray(left) && !Array.isArray(right)) {
    return Math.sign(right - left);
  }

  for (let i = 0; i < left.length; i++) {
    if (right[i] === undefined) {
      return -1;
    }

    const result = compare(left[i], right[i]);

    if (result !== 0) {
      return result;
    }
  }

  return left.length < right.length ? 1 : 0;
};

let result = 0;
let i = 1;

for (const pair of pairs) {
  const [one, two] = pair.trim().split('\n').map(JSON.parse);

  if (compare(one, two) === 1) {
    result += i;
  }

  i++;
}

console.log(result);
