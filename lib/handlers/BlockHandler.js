const BlockParser = require("../parsers/BlockParser");
const FoundBlock = require("../stats/FoundBlock");

class BlockHandler {
  constructor() {
    this.parser = new BlockParser();
    this.stat = new FoundBlock();
  }

  handle(line) {
    let evs = [];

    console.log('BlockHandler');
    const message = this.parser.parse(line);
    evs = this.handleMessage(message);

    if (message.length > 0) {
      const stEv = this.handleStats(message);
      evs = evs.concat(stEv);
    }

    return evs;
  }

  handleMessage(message) {

  }

  handleStats(message) {

  }
}

module.exports = BlockHandler;