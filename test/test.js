const ChiaWatchDog = require('../index');

const cwd = new ChiaWatchDog();
cwd.on('dog', (ev) => {
  console.log('dog', ev);
});

cwd.on('dailydog', (ev) => {
  console.log('dailydog', ev);
});

cwd.start();