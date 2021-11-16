const { logger } = require('../utils/logger');
const { CWDEvent, TYPE_DAILY_STATS, PRIORITY_LOW, SERVICE_DAILY, EVT_DAILY_BLOCK_FOUND } = require('../utils/event');

class FoundBlock {
  constructor() {
    this.foundBlocksTotal = 0;
  }

  reset() {
    this.foundBlocksTotal = 0;
  }

  consume(message) {
    this.foundBlocksTotal += message.blocksCount;
  }

  getSummary() {
    const data = {
      type: EVT_DAILY_BLOCK_FOUND,
      msg: `${this.foundBlocksTotal} blocks found 📦`,
      foundBlocksTotal: this.foundBlocksTotal
    };
    return [new CWDEvent(TYPE_DAILY_STATS, PRIORITY_LOW, SERVICE_DAILY, data)];
  }

}

module.exports = FoundBlock;