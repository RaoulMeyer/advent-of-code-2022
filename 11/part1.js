const fs = require('fs');

const monkeys = fs.readFileSync('./input', 'utf8').trim().split('\n\n');

const items = [];
const operations = [];
const tests = [];
const destinations = [];

for (const monkey of monkeys) {
  const lines = monkey.split('\n').map(str => str.trim());

  const [,,...itemParts] = lines[1].split(' ');
  items.push(itemParts.join(' ').split(',').map(str => Number(str.trim())));

  const [,operationString] = lines[2].split('new = ');
  operations.push(old => eval(operationString));

  tests.push(value => (value % Number(lines[3].split(' ').pop()) === 0));

  destinations.push(testResult => testResult ? Number(lines[4].split(' ').pop()) : Number(lines[5].split(' ').pop()));
}

const inspections = new Array(monkeys.length).fill(0);

for (let i = 0; i < 20; i++) {
  for (let index = 0; index < monkeys.length; index++) {
    for (const item of items[index]) {
      inspections[index]++;

      const afterInspection = operations[index](item);
      const afterRelief = Math.floor(afterInspection / 3);

      items[destinations[index](tests[index](afterRelief))].push(afterRelief);
    }

    items[index] = [];
  }
}

inspections.sort((a,b) => Math.sign(b - a));

console.log(inspections[0] * inspections[1]);
