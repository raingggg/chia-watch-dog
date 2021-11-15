const WalletParser = require("../parsers/WalletParser");
const AddedCoin = require("../stats/AddedCoin");
const { CWDEvent, PRIORITY_LOW, SERVICE_FULL_NODE } = require('../utils/event');

class WalletHandler {
  constructor() {
    this.parser = new WalletParser();
  }

  handle(line, stats) {
    let evs = [];

    console.log('WalletHandler');
    const message = this.parser.parse(line);
    if (message) {
      evs = this.handleMessage(message);
      this.handleStats(message, stats);
    }

    return evs;
  }

  handleMessage(message) {
    return [new CWDEvent(TYPE_USER, PRIORITY_LOW, SERVICE_WALLET, message)];
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