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
    const message = {
      initialPlotCount: this.initialPlotCount,
      currentPlotCount: this.currentPlotCount,
      newPlotsCount: this.currentPlotCount - this.initialPlotCount,
      removedPlotsCount: this.initialPlotCount - this.currentPlotCount,
    };
    return [new CWDEvent(TYPE_DAILY_STATS, PRIORITY_LOW, SERVICE_DAILY, message)];
  }

}

module.exports = NumberPlots;