const os = require('os');
const path = require('path');
const CONFIG_FILENAME = process.env['config_file'] || '../../chia.json';
const blockchainConfig = require(CONFIG_FILENAME);

const homedir = os.homedir();

const getFullPath = (p) => {
  if (p.startsWith('/')) return p;
  else return path.resolve(homedir, p);
};

Object.assign(blockchainConfig, {
  chainlog: getFullPath(blockchainConfig.chainlog),
  watchDogLogFile: getFullPath(blockchainConfig.watchDogLogFile)
});

module.exports = {
  blockchainConfig,
};