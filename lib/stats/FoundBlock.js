const { CWDEvent, TYPE_DAILY_STATS, PRIORITY_LOW, SERVICE_DAILY } = require('../utils/event');

class FoundBlock {
  constructor() {
    this.lastResetTime = new Date();
    this.foundBlocksTotal = 0;
  }

  reset() {
    this.lastResetTime = new Date();
    this.foundBlocksTotal = 0;
  }

  consume(message) {
    this.foundBlocksTotal += message.data.blocksCount;
  }

  getSummary() {
    return new CWDEvent(TYPE_DAILY_STATS, PRIORITY_LOW, SERVICE_DAILY, { foundBlocksTotal: this.foundBlocksTotal });
  }

}

module.exports = FoundBlock;