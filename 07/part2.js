const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8').trim();

let currentDir = null;
const filesystem = {};

for (const line of input.split('\n')) {
  if (line[0] === '$') {
    const [, command, path] = line.split(' ');

    if (command === 'cd') {
      if (path[0] === '/') {
        currentDir = [];
      } else if (path === '..') {
        currentDir.pop();
      } else {
        currentDir.push(path);
      }
    }

    continue;
  }

  let current = filesystem;

  for (const dir of currentDir) {
    current = current[dir];
  }

  if (line[0] === 'd') {
    const [, directory] = line.split(' ');

    current[directory] = current[directory] || {};
  } else {
    const [size, file] = line.split(' ');

    current[file] = Number(size);
  }
}

const dirs = [];

function smallDirs(currentDir) {
  let total = 0;

  for (const value of Object.values(currentDir)) {
    if (typeof value === 'number') {
      total += value;
    } else {
      total += smallDirs(value);
    }
  }

  dirs.push(total);

  return total;
}

smallDirs(filesystem);

dirs.sort((a, b) => Math.sign(a - b));

const totalSize = dirs.pop();
const unused = 70000000 - totalSize;
const toDelete = 30000000 - unused;

console.log(dirs.find(dir => dir >= toDelete));
