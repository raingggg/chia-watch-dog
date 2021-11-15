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
    return [new CWDEvent(TYPE_DAILY_STATS, PRIORITY_LOW, SERVICE_DAILY, { foundPartialTotal: this.foundPartialTotal })];
  }

}

module.exports = FoundPartial;