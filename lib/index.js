const path = require('path');
const { EventEmitter } = require('events');
const { Tail } = require('tail');

const {
  FullnodeParser,
  HarvesterParser,
  WalletParser,
} = require('./parsers');

const homedir = require('os').homedir();
const chiaLogPath = path.resolve(homedir, '.flora/mainnet/log/debug.log');

class ChiaWatchDog extends EventEmitter {
  constructor() {
    super();

    this.parsers = [new FullnodeParser(), new HarvesterParser(), new WalletParser()];
    this.tail = new Tail(chiaLogPath);
  }

  start() {
    this.tail.on("line", (data) => {
      console.log('line', data);

      this.parsers.forEach((ps, psIndex) => {
        ps.parse(data);
        this.emit('pstart', `${psIndex} data emitted`);
      });
    });

  }
}

module.exports = ChiaWatchDog;