const { logger } = require('../utils/logger');
const { CWDEvent, TYPE_DAILY_STATS, PRIORITY_LOW, SERVICE_DAILY, EVT_DAILY_PROOF_FOUND } = require('../utils/event');

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
    const data = {
      type: EVT_DAILY_PROOF_FOUND,
      msg: `Proofs 🧾: ${this.foundProofsTotal} found!`,
      foundProofsTotal: this.foundProofsTotal
    };
    return [new CWDEvent(TYPE_DAILY_STATS, PRIORITY_LOW, SERVICE_DAILY, data)];
  }

}

module.exports = FoundProof;