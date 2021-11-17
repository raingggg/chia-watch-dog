const os = require('os');
const path = require('path');
const CONFIG_FILENAME = process.env['config_file'] || '../../chia.json';

const homedir = os.homedir();

const getFullPath = (p) => {
  if (p.startsWith('/')) return p;
  else if (p.startsWith('./') || p.startsWith('../')) return path.resolve(__dirname, p);
  else return path.resolve(homedir, p);
};

const blockchainConfig = require(getFullPath(CONFIG_FILENAME));
Object.assign(blockchainConfig, {
  chainlog: getFullPath(blockchainConfig.chainlog),
  watchDogLogFile: getFullPath(blockchainConfig.watchDogLogFile)
});

module.exports = {
  blockchainConfig,
};