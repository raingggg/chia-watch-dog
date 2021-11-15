const { CWDEvent, TYPE_DAILY_STATS, PRIORITY_LOW, SERVICE_DAILY, EVT_DAILY_ELIGIGLE_PLOTS } = require('../utils/event');

class EligiblePlots {
  constructor() {
    this.eligiblePlotsTotal = 0;
    this.eligibleEventsTotal = 0;
  }

  reset() {
    this.eligiblePlotsTotal = 0;
    this.eligibleEventsTotal = 0;
  }

  consume(message) {
    this.eligiblePlotsTotal += message.eligiblePlotsCount
    this.eligibleEventsTotal += 1
  }

  getSummary() {
    if (this.eligibleEventsTotal === 0) return [];

    const averageEligiblePlots = (this.eligiblePlotsTotal / this.eligibleEventsTotal).toFixed(2);
    const data = {
      type: EVT_DAILY_ELIGIGLE_PLOTS,
      msg: `Eligible plots 🥇: ${averageEligiblePlots} average`,
      averageEligiblePlots
    };
    return [new CWDEvent(TYPE_DAILY_STATS, PRIORITY_LOW, SERVICE_DAILY, data)];
  }

}

module.exports = EligiblePlots;