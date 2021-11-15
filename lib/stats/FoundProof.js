class FoundProof {
  constructor() {
    this.foundProofsTotal = 0;
  }

  reset() {
    this.foundProofsTotal = 0;
  }

  consume(message) {
    this.foundProofsTotal += message.foundProofsCount;
  }

  getSummary() {
    return [new CWDEvent(TYPE_DAILY_STATS, PRIORITY_LOW, SERVICE_DAILY, { foundProofsTotal: this.foundProofsTotal })];
  }

}

module.exports = FoundProof;