const PartialParser = require("../parsers/PartialParser");
const FoundPartial = require("../stats/FoundPartial");
const { logger } = require('../utils/logger');

class PartialHandler {
  constructor() {
    this.parser = new PartialParser();
  }

  handle(line, stats, samplePercentage) {
    let evs = [];

    logger.debug('PartialHandler');
    const message = this.parser.parse(line);
    if (message) {
      // no realtime event for partial
      // evs = this.handleMessage(message);
      this.handleStats(message, stats);
    }

    return evs;
  }

  handleMessage(message) {

  }

  handleStats(message, stats) {
    stats.forEach(st => {
      if (st instanceof FoundPartial) {
        st.consume(message);
      }
    })
  }
}

module.exports = PartialHandler;