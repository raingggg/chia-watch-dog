const { REG_ADD_COIN } = require('../utils/regex');
const { logger } = require('../utils/logger');

class WalletParser {
  parse(line) {
    const match = REG_ADD_COIN.exec(line);
    if (match) {
      logger.debug('WalletParser: ', [match[1], match[2]]);
      return { timestamp: new Date(match[1]).getTime(), amountCoins: parseFloat(match[2]) / 1e12 };
    }
  }
}

module.exports = WalletParser;