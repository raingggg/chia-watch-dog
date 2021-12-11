const HarvesterActiviyParser = require("../parsers/HarvesterActiviyParser");
const EligiblePlots = require("../stats/EligiblePlots");
const NumberPlots = require("../stats/NumberPlots");
const FoundProof = require("../stats/FoundProof");
const DiskSearchTime = require("../stats/DiskSearchTime");
const { logger } = require('../utils/logger');

const {
  CWDEvent,
  TYPE_USER,
  PRIORITY_LOW,
  PRIORITY_NORMAL,
  PRIORITY_HIGH,
  SERVICE_HARVESTER,
  EVT_INTIME_NO_EVENTS,
  EVT_INTIME_PLOT_DECREASE,
  EVT_INTIME_PLOT_LONG,
} = require('../utils/event');

const harvesterWarnThreshold = 90; // 1.5 min
const plotDecreaseWarnThreshold = 2;
const decreasingPlotTimeThreshold = 600; // 10 min
const diskSearchWarnThreshold = 30;
const diskSearchTimeThreshold = 600; // 10 min

class HarvesterActivityHandler {
  constructor() {
    this.parser = new HarvesterActiviyParser();

    const nowTime = new Date().getTime();
    this.harvesterLastTimestamp = nowTime;
    this.decreasingPlotLastTimestamp = nowTime;
    this.tooLongSearchLastTimestamp = nowTime;
    this.maxFarmedPlots = 0;
  }

  handle(line, stats) {
    let evs = [];

    logger.debug('HarvesterActivityHandler');
    const message = this.parser.parse(line);
    if (message) {
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
    const duration = (now - this.harvesterLastTimestamp) / 1000;
    if (duration > harvesterWarnThreshold) {
      const data = Object.assign({}, message, {
        type: EVT_INTIME_NO_EVENTS,
        msg: `Your harvester appears to be offline! No events for the past ${duration} seconds`,
        duration,
      });
      evs = [new CWDEvent(TYPE_USER, PRIORITY_LOW, SERVICE_HARVESTER, data)];
    }
    this.harvesterLastTimestamp = now;

    return evs;
  }

  nonDecreasingPlots(message) {
    let evs = [];

    const { totalPlotsCount } = message;
    logger.debug('nonDecreasingPlots:', [totalPlotsCount, this.maxFarmedPlots]);
    if (totalPlotsCount > this.maxFarmedPlots) {
      this.maxFarmedPlots = totalPlotsCount;
    }

    const now = new Date().getTime();
    const duration = (now - this.decreasingPlotLastTimestamp) / 1000;
    // console.log('nonDecreasingPlots', duration);
    if (duration < decreasingPlotTimeThreshold) return evs;

    if (this.maxFarmedPlots - totalPlotsCount > plotDecreaseWarnThreshold) {
      const data = Object.assign({}, message, {
        type: EVT_INTIME_PLOT_DECREASE,
        msg: `Disconnected HDD? The total plot count decreased from ${this.maxFarmedPlots} to ${totalPlotsCount}.`,
        maxFarmedPlots: this.maxFarmedPlots,
        totalPlotsCount,
      });
      evs = [new CWDEvent(TYPE_USER, PRIORITY_HIGH, SERVICE_HARVESTER, data)];
      this.decreasingPlotLastTimestamp = now;
    }

    return evs;
  }

  quickPlotSearchTime(message) {
    let evs = [];

    const now = new Date().getTime();
    const duration = (now - this.tooLongSearchLastTimestamp) / 1000;
    // console.log('quickPlotSearchTime', duration);
    if (duration < diskSearchTimeThreshold) return evs;

    const { searchTimeSeconds } = message;
    if (searchTimeSeconds > diskSearchWarnThreshold) {
      const data = Object.assign({}, message, {
        type: EVT_INTIME_PLOT_LONG,
        msg: `Seeking plots took too long: ${searchTimeSeconds} seconds!`,
        searchTimeSeconds,
      });
      evs = [new CWDEvent(TYPE_USER, PRIORITY_NORMAL, SERVICE_HARVESTER, data)];
      this.tooLongSearchLastTimestamp = now;
    }

    return evs;
  }
}

module.exports = HarvesterActivityHandler;