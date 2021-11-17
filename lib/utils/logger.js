const log4js = require("log4js");
const { blockchainConfig } = require('./chiaConfig');

log4js.configure({
  appenders: { cheese: { type: "file", filename: blockchainConfig.watchDogLogFile } },
  categories: { default: { appenders: ["cheese"], level: blockchainConfig.watchDogLogLevel } }
});

const logger = log4js.getLogger("cheese");

module.exports = {
  logger
};