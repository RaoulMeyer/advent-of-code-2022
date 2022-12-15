const fs = require('fs');

const lines = fs.readFileSync('./input', 'utf8').trim().split('\n');

const sensors = [];

for (const line of lines) {
  const [sensorX, sensorY, beaconX, beaconY] = line.split(' ').map(str => str.replaceAll(/[^\d^-]+/g, '')).filter(Boolean).map(Number);

  sensors.push({
    x: sensorX,
    y: sensorY,
    distance: Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY)
  });
}

const boundary = 4000000;

for (const sensor of sensors) {
  const start = [sensor.x - sensor.distance - 1, sensor.y];
  let pos = [...start];
  let previous = null;

  while (previous === null || pos[0] !== start[0] || pos[1] !== start[1]) {
    if (pos[0] >= 0 && pos[0] <= boundary && pos[1] >= 0 && pos[1] <= boundary) {
      let covered = false;

      for (const sensor of sensors) {
        if (Math.abs(pos[0] - sensor.x) + Math.abs(pos[1] - sensor.y) <= sensor.distance) {
          covered = true;
          break;
        }
      }

      if (!covered) {
        console.log(pos[0] * 4000000 + pos[1]);
        process.exit();
      }
    }

    const [newPos] =
        [[1, 1], [1, -1], [-1, 1], [-1, -1]]
          .map(m => [pos[0] + m[0], pos[1] + m[1]])
          .filter(p => previous === null || p[0] !== previous[0] || p[1] !== previous[1])
          .filter(p => {
            return Math.abs(p[0] - sensor.x) + Math.abs(p[1] - sensor.y) === sensor.distance + 1;
          });

    previous = pos;
    pos = newPos;
  }
}

console.log('wtf');
