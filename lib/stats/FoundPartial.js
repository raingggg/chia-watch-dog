const { CWDEvent, TYPE_DAILY_STATS, PRIORITY_LOW, SERVICE_DAILY, EVT_DAILY_PARITAL_SUBMITTED } = require('../utils/event');

class FoundPartial {
  constructor() {
    this.foundPartialTotal = 0;
  }

  reset() {
    this.foundPartialTotal = 0;
  }

  consume(message) {
    this.foundPartialTotal += message.partialsCount;
  }

  getSummary() {
    const data = {
      type: EVT_DAILY_PARITAL_SUBMITTED,
      msg: `${this.foundPartialTotal} partials submitted 📑`,
      foundPartialTotal: this.foundPartialTotal
    };
    return [new CWDEvent(TYPE_DAILY_STATS, PRIORITY_LOW, SERVICE_DAILY, data)];
  }

}

module.exports = FoundPartial;