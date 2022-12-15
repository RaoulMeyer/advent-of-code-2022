const fs = require('fs');

const lines = fs.readFileSync('./input', 'utf8').trim().split('\n');

const sensors = [];
const beacons = new Map();

for (const line of lines) {
  const [sensorX, sensorY, beaconX, beaconY] = line.split(' ').map(str => str.replaceAll(/[^\d^-]+/g, '')).filter(Boolean).map(Number);

  sensors.push({
    x: sensorX,
    y: sensorY,
    distance: Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY)
  });

  beacons.set(`${beaconX},${beaconY}`, true);
}

const y = 2000000;
let covered = 0;

for (let x = -1e7; x < 1e7; x++) {
  if (beacons.has(`${x},${y}`)) {
    continue;
  }

  for (const sensor of sensors) {
    if (Math.abs(x - sensor.x) + Math.abs(y - sensor.y) <= sensor.distance) {
      covered++;
      break;
    }
  }
}

console.log(covered);
