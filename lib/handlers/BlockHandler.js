const BlockParser = require("../parsers/BlockParser");
const FoundBlock = require("../stats/FoundBlock");
const { CWDEvent, PRIORITY_LOW, SERVICE_FULL_NODE, EVT_BLOCK_FOUND } = require('../utils/event');

class BlockHandler {
  constructor() {
    this.parser = new BlockParser();
  }

  handle(line, stats) {
    let evs = [];

    console.log('BlockHandler');
    const message = this.parser.parse(line);
    if (message) {
      evs = this.handleMessage(message);
      this.handleStats(message, stats);
    }

    return evs;
  }

  handleMessage(message) {
    const data = Object.assign({}, message, { type: EVT_BLOCK_FOUND, msg: 'Block found!!' })
    return [new CWDEvent(TYPE_USER, PRIORITY_LOW, SERVICE_FULL_NODE, message)];
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