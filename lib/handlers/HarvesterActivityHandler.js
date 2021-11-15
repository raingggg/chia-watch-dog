const HarvesterActivityParser = require("../parsers/HarvesterActivityParser");
const FoundBlock = require("../stats/FoundBlock");
const { CWDEvent, PRIORITY_LOW, SERVICE_FULL_NODE } = require('../utils/event');

const harvesterWarnThreshold = 90 * 1000;
const plotDecreaseWarnThreshold = 2;
const diskSearchWarnThreshold = 30 * 1000;

class HarvesterActivityHandler {
  constructor() {
    this.parser = new HarvesterActivityParser();

    this.harvesterLastTimestamp = new Date().getTime();
    this.maxFarmedPlots = 0;
  }

  handle(line, stats) {
    let evs = [];

    console.log('HarvesterActivityHandler');
    const message = this.parser.parse(line);
    if (message.length > 0) {
      evs = this.handleMessage(message);
      this.handleStats(message, stats);
    }

    return evs;
  }

  handleMessage(message) {
    const e1 = this.timeSinceLastFarmEvent(message);
    const e2 = this.nonDecreasingPlots(message);
    const e3 = this.quickPlotSearchTime(message);

    return e1.concat(e2).concat(e3);
  }

  handleStats(message, stats) {
    stats.forEach(st => {
      if (st instanceof EligiblePlots
        || st instanceof NumberPlots
        || st instanceof FoundProof
        || st instanceof DiskSearchTime) {
        st.consume(message);
      }
    })
  }

  timeSinceLastFarmEvent(message) {
    let evs = [];

    const now = new Date().getTime();
    if (now - this.harvesterLastTimestamp > harvesterWarnThreshold) {
      this.harvesterLastTimestamp = now;
      evs = [new CWDEvent(TYPE_USER, PRIORITY_LOW, SERVICE_HARVESTER, message)];
    }

    return evs;
  }

  nonDecreasingPlots(message) {
    let evs = [];

    const { totalPlotsCount } = message;
    if (totalPlotsCount > this.maxFarmedPlots) {
      this.maxFarmedPlots = totalPlotsCount;
    }

    if (this.maxFarmedPlots - totalPlotsCount > plotDecreaseWarnThreshold) {
      evs = [new CWDEvent(TYPE_USER, PRIORITY_HIGH, SERVICE_HARVESTER, message)];
    }

    return evs;
  }

  quickPlotSearchTime(message) {
    let evs = [];

    const { searchTimeSeconds } = message;
    if (searchTimeSeconds > diskSearchWarnThreshold) {
      evs = [new CWDEvent(TYPE_USER, PRIORITY_NORMAL, SERVICE_HARVESTER, message)];
    }

    return evs;
  }
}

module.exports = HarvesterActivityHandler;