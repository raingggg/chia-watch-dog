const { ChiaWatchDog } = require('../index');

const cwd = new ChiaWatchDog();
cwd.on('dog', (ev) => {
  logger.info('dog', ev);
});

cwd.on('dailydog', (ev) => {
  logger.info('dailydog', ev);
});

cwd.start();