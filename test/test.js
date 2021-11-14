const ChiaWatchDog = require('../index');

const cwd = new ChiaWatchDog();
cwd.on('dog', (str) => {
  console.log('dog', str);
});

cwd.start();