const {
  FullnodeParser,
  HarvesterParser,
  WalletParser,
} = require('./parsers');

class ChiaWatchDog {
  constructor() {
    this.parsers = [new FullnodeParser(), new HarvesterParser(), new WalletParser()];
  }

  start() {
    this.parsers.forEach(ps => {
      ps.parse();
    });
  }
}

module.exports = ChiaWatchDog;