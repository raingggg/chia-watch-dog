const { CWDEvent, TYPE_DAILY_STATS, PRIORITY_LOW, SERVICE_DAILY } = require('../utils/event');

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
    return [new CWDEvent(TYPE_DAILY_STATS, PRIORITY_LOW, SERVICE_DAILY, { totalAddedCoins: this.totalAddedCoins })];
  }

}

module.exports = AddedCoin;