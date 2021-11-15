const { CWDEvent, TYPE_DAILY_STATS, PRIORITY_LOW, SERVICE_DAILY, EVT_DAILY_NUMBER_PLOTS } = require('../utils/event');

class NumberPlots {
  constructor() {
    this.initialPlotCount = 0;
    this.currentPlotCount = 0;
  }

  reset() {
    this.initialPlotCount = 0;
    this.currentPlotCount = 0;
  }

  consume(message) {
    const { totalPlotsCount } = message;
    if (this.initialPlotCount === 0) {
      this.initialPlotCount = totalPlotsCount;
    }
    this.currentPlotCount = totalPlotsCount;
  }

  getSummary() {
    const data = {
      initialPlotCount: this.initialPlotCount,
      currentPlotCount: this.currentPlotCount,
      newPlotsCount: this.currentPlotCount - this.initialPlotCount,
      removedPlotsCount: this.initialPlotCount - this.currentPlotCount,
    };
    Object.assign(data, {
      type: EVT_DAILY_NUMBER_PLOTS,
      msg: `Plots 🌱: ${currentPlotCount}, new: ${newPlotsCount}`
    });
    return [new CWDEvent(TYPE_DAILY_STATS, PRIORITY_LOW, SERVICE_DAILY, data)];
  }

}

module.exports = NumberPlots;