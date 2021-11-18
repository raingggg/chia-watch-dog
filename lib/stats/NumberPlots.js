const { logger } = require('../utils/logger');
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
    const { initialPlotCount, currentPlotCount } = this;
    const newPlotsCount = currentPlotCount - initialPlotCount;
    const data = {
      initialPlotCount,
      currentPlotCount,
      newPlotsCount,
    };
    Object.assign(data, {
      type: EVT_DAILY_NUMBER_PLOTS,
      msg: `Plots 🌱: ${currentPlotCount}, new: ${newPlotsCount}`
    });
    return [new CWDEvent(TYPE_DAILY_STATS, PRIORITY_LOW, SERVICE_DAILY, data)];
  }

}

module.exports = NumberPlots;