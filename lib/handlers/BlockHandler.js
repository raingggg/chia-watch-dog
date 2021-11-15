const BlockParser = require("../parsers/BlockParser");
const FoundBlock = require("../stats/FoundBlock");
const { CWDEvent, PRIORITY_LOW, SERVICE_FULL_NODE } = require('../utils/event');

class BlockHandler {
  constructor() {
    this.parser = new BlockParser();
  }

  handle(line, stats) {
    let evs = [];

    console.log('BlockHandler');
    const message = this.parser.parse(line);
    if (message.length > 0) {
      evs = this.handleMessage(message);
      this.handleStats(message, stats);
    }

    return evs;
  }

  handleMessage(message) {
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