const path = require('path');
const { EventEmitter } = require('events');
const { Tail } = require('tail');

const {
  BlockHandler,
  HarvesterActivityHandler,
  PartialHandler,
  SignagePointHandler,
  WalletHandler,
} = require('./handlers');

const homedir = require('os').homedir();
const chiaLogPath = path.resolve(homedir, '.flora/mainnet/log/debug.log');

class ChiaWatchDog extends EventEmitter {
  constructor() {
    super();

    this.tail = new Tail(chiaLogPath);
    this.handlers = [
      new BlockHandler(),
      new HarvesterActivityHandler(),
      new PartialHandler(),
      new SignagePointHandler(),
      new WalletHandler()
    ];
  }

  start() {
    this.tail.on("line", (line) => {
      console.log('line', line);

      this.handlers.forEach((hd, hdIndex) => {
        const evs = hd.handle(line);
        evs.forEach(ev => {
          this.emit('dog', ev);
        });
      });
    });

  }
}

module.exports = ChiaWatchDog;