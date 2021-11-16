const SignagePointParser = require("../parsers/SignagePointParser");
const SignagePoint = require("../stats/SignagePoint");
const { CWDEvent, TYPE_USER, PRIORITY_LOW, SERVICE_FULL_NODE, EVT_SKIP_POINT } = require('../utils/event');
const { calculateSkippedSignagePoints } = require('../utils/blockUtil');
const { logger } = require('../utils/logger');

class SignagePointHandler {
  constructor() {
    this.parser = new SignagePointParser();
    this.lastSignagePointTimestamp = null;
    this.lastSignagePoint = null;
  }

  handle(line, stats) {
    let evs = [];

    logger.debug('SignagePointHandler');
    const message = this.parser.parse(line);
    if (message) {
      evs = this.handleMessage(message);
      this.handleStats(message, stats);
    }

    return evs;
  }

  handleMessage(message) {
    return this.nonSkippedSignagePoints(message);
  }

  handleStats(message, stats) {
    stats.forEach(st => {
      if (st instanceof SignagePoint) {
        st.consume(message);
      }
    })
  }

  nonSkippedSignagePoints(message) {
    let evs = [];
    if (!this.lastSignagePoint) {
      this.lastSignagePointTimestamp = message.timestamp
      this.lastSignagePoint = message.signagePoint
      return evs;
    }

    const { valid, skipped } = calculateSkippedSignagePoints(this.lastSignagePointTimestamp, this.lastSignagePoint, message.timestamp, message.signagePoint);
    if (!valid) return evs;

    if (skipped >= 2) {
      const data = Object.assign({}, message, {
        type: EVT_SKIP_POINT,
        msg: `Experiencing networking issues? Skipped ${skipped} signage points!`,
        skipped,
      });
      evs.push(new CWDEvent(TYPE_USER, PRIORITY_LOW, SERVICE_FULL_NODE, data));
    }

    this.lastSignagePointTimestamp = message.timestamp;
    this.lastSignagePoint = message.signagePoint;

    return evs;
  }
}

module.exports = SignagePointHandler;