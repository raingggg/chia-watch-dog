const WalletParser = require("../parsers/WalletParser");
const AddedCoin = require("../stats/AddedCoin");
const { CWDEvent, TYPE_USER, PRIORITY_LOW, SERVICE_WALLET, EVT_INTIME_RECEIVE_COIN } = require('../utils/event');
const { logger } = require('../utils/logger');

class WalletHandler {
  constructor() {
    this.parser = new WalletParser();
  }

  handle(line, stats, samplePercentage) {
    let evs = [];

    logger.debug('WalletHandler');
    const message = this.parser.parse(line);
    if (message) {
      evs = this.handleMessage(message);
      this.handleStats(message, stats);
    }

    return evs;
  }

  handleMessage(message) {
    const data = Object.assign({}, message, {
      type: EVT_INTIME_RECEIVE_COIN,
      msg: `Cha-ching! Just received ${message.amountCoins} coins ☘️`,
      amountCoins: message.amountCoins,
    });
    return [new CWDEvent(TYPE_USER, PRIORITY_LOW, SERVICE_WALLET, data)];
  }

  handleStats(message, stats) {
    stats.forEach(st => {
      if (st instanceof AddedCoin) {
        st.consume(message);
      }
    })
  }
}

module.exports = WalletHandler;