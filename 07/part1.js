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

let result = 0;
let dirs = [];

function smallDirs(currentDir, dirName) {
  let total = 0;

  for (const [name, value] of Object.entries(currentDir)) {
    if (typeof value === 'number') {
      total += value;
    } else {
      total += smallDirs(value, [...dirName, name]);
    }
  }

  dirs.push(['/' + dirName.join('/'), total]);

  if (total < 100000) {
    result += total;
  }

  return total;
}

smallDirs(filesystem, []);

console.log(dirs.map(dir => dir.join(' ')).join('\n'));
