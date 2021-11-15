const WalletParser = require("../parsers/WalletParser");
const AddedCoin = require("../stats/AddedCoin");
const { CWDEvent, PRIORITY_LOW, SERVICE_WALLET, EVT_RECEIVE_COIN } = require('../utils/event');

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
    const data = Object.assign({}, message, {
      type: EVT_RECEIVE_COIN,
      msg: `Cha-ching! Just received ${message.amountCoins} XCH ☘️`
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