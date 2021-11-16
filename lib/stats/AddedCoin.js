const { logger } = require('../utils/logger');
const { CWDEvent, TYPE_DAILY_STATS, PRIORITY_LOW, SERVICE_DAILY, EVT_DAILY_RECEIVE_COIN } = require('../utils/event');

class AddedCoin {
  constructor() {
    this.totalAddedCoins = 0;
  }

  reset() {
    this.totalAddedCoins = 0;
  }

  consume(message) {
    this.totalAddedCoins += message.amountCoins;
  }

  getSummary() {
    const data = {
      type: EVT_DAILY_RECEIVE_COIN,
      msg: `Received ☘️: ${this.totalAddedCoins} coins`,
      totalAddedCoins: this.totalAddedCoins
    };
    return [new CWDEvent(TYPE_DAILY_STATS, PRIORITY_LOW, SERVICE_DAILY, data)];
  }

}

module.exports = AddedCoin;