const BlockParser = require("../parsers/BlockParser");
const FoundBlock = require("../stats/FoundBlock");
const { logger } = require('../utils/logger');

const { CWDEvent, TYPE_USER, PRIORITY_LOW, SERVICE_FULL_NODE, EVT_INTIME_BLOCK_FOUND } = require('../utils/event');

class BlockHandler {
  constructor() {
    this.parser = new BlockParser();
  }

  handle(line, stats, samplePercentage) {
    let evs = [];

    logger.debug('BlockHandler');
    const message = this.parser.parse(line);
    if (message) {
      evs = this.handleMessage(message);
      this.handleStats(message, stats);
    }

    return evs;
  }

  handleMessage(message) {
    const data = Object.assign({}, message, { type: EVT_INTIME_BLOCK_FOUND, msg: 'Block found!!' })
    return [new CWDEvent(TYPE_USER, PRIORITY_LOW, SERVICE_FULL_NODE, data)];
  }

  handleStats(message, stats) {
    stats.forEach(st => {
      if (st instanceof FoundBlock) {
        st.consume(message);
      }
    })
  }
}

module.exports = BlockHandler;