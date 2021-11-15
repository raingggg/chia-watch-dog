const PartialParser = require("../parsers/PartialParser");
const FoundPartial = require("../stats/FoundPartial");

class PartialHandler {
  constructor() {
    this.parser = new PartialParser();
  }

  handle(line, stats) {
    let evs = [];

    console.log('PartialHandler');
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