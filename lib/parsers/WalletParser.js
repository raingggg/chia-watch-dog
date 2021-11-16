const { REG_ADD_COIN } = require('../utils/regex');
const { logger } = require('../utils/logger');

class WalletParser {
  parse(line) {
    logger.debug('WalletParser parse');
    const match = REG_ADD_COIN.exec(line);
    logger.info(match);
    if (match) {
      return { timestamp: new Date(match[0]).getTime(), amountCoins: match[1] / 1e12 };
    }
  }
}

module.exports = WalletParser;