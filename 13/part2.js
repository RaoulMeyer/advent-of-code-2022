const fs = require('fs');

const pairs = fs.readFileSync('./input', 'utf8').trim().split('\n\n').join('\n').split('\n').map(line => JSON.parse(line));

const two = JSON.parse('[[2]]');
const six = JSON.parse('[[6]]');

pairs.push(two);
pairs.push(six);

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

pairs.sort(compare).reverse();

console.log((pairs.indexOf(two) + 1) * (pairs.indexOf(six) + 1));
