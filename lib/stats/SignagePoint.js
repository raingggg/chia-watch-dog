const { calculateSkippedSignagePoints } = require('../utils/blockUtil');
const { CWDEvent, TYPE_DAILY_STATS, PRIORITY_LOW, SERVICE_DAILY, EVT_DAILY_SKIP_POINT } = require('../utils/event');

class SignagePoint {
  constructor() {
    this.lastSignagePointTimestamp = null;
    this.lastSignagePoint = null;
    this.skipsTotal = 0;
    this.total = 0;
  }

  reset() {
    this.lastSignagePointTimestamp = null;
    this.lastSignagePoint = null;
    this.skipsTotal = 0;
    this.total = 0;
  }

  consume(message) {
    if (!this.lastSignagePoint) {
      this.lastSignagePointTimestamp = message.timestamp;
      this.lastSignagePoint = message.signagePoint;
      return;
    }

    const { valid, skipped } = calculateSkippedSignagePoints(this.lastSignagePointTimestamp, this.lastSignagePoint, message.timestamp, message.signagePoint);
    if (!valid) return;

    this.skipsTotal += skipped;
    this.total += 1 + skipped;

    this.lastSignagePointTimestamp = message.timestamp;
    this.lastSignagePoint = message.signagePoint;
  }

  getSummary() {
    if (this.total === 0) return [];

    if (this.skipsTotal > 0) {
      const percentageSkipped = ((this.skipsTotal / this.total) * 100).toFixed(2);
      const data = {
        type: EVT_DAILY_SKIP_POINT,
        msg: `Skipped SPs ⚠️: ${this.skipsTotal} (${percentageSkipped}%)`,
        skipsTotal: this.skipsTotal,
        percentageSkipped
      }
      return [new CWDEvent(TYPE_DAILY_STATS, PRIORITY_LOW, SERVICE_DAILY, data)];
    }

    return [];
  }

}

module.exports = SignagePoint;