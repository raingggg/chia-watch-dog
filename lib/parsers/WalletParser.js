const { REG_ADD_COIN } = require('../utils/regex');

class WalletParser {
  parse(line) {
    console.log('WalletParser parse');
    const match = REG_ADD_COIN.exec(line);
    if (match) {
      return { timestamp: new Date(match[0]).getTime(), amountCoins: match[1] / 1e12 };
    }
  }
}

module.exports = WalletParser;