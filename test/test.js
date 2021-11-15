const ChiaWatchDog = require('../index');

const cwd = new ChiaWatchDog();
cwd.on('dog', (str) => {
  console.log('dog', str);
});

cwd.on('dailydog', (str) => {
  console.log('dailydog', str);
});

cwd.start();