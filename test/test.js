const { logger } = require('../lib/utils/logger');
const { ChiaWatchDog } = require('../index');

const cwd = new ChiaWatchDog('.chia/mainnet/log/debug.log');
// cwd.sampleWithPercentate(5);

cwd.on('dog', (ev) => {
  logger.error('dog', ev);
});

cwd.on('dailydog', (ev) => {
  logger.error('dailydog', ev);
});

cwd.start();