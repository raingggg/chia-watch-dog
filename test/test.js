const { logger } = require('../lib/utils/logger');
const { ChiaWatchDog } = require('../index');

const cwd = new ChiaWatchDog('.chia/mainnet/log/debug.log');
cwd.on('dog', (ev) => {
  logger.info('dog', ev);
});

cwd.on('dailydog', (ev) => {
  logger.info('dailydog', ev);
});

cwd.start();