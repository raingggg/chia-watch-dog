const ChiaWatchDog = require('../index');

const cwd = new ChiaWatchDog();
cwd.on('pstart', (str) => {
  console.log('pstart', str);
});

cwd.start();