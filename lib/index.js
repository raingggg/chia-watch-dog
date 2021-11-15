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

const {
  AddedCoin,
  DiskSearchTime,
  EligiblePlots,
  FoundBlock,
  FoundPartial,
  FoundProof,
  NumberPlots,
  SignagePoint,
} = require('../stats');

const homedir = require('os').homedir();
const chiaLogPath = path.resolve(homedir, '.flora/mainnet/log/debug.log');
const oneDay = 1000 * 60 * 60 * 24;

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

    this.stats = [
      new AddedCoin(),
      new DiskSearchTime(),
      new EligiblePlots(),
      new FoundBlock(),
      new FoundPartial(),
      new FoundProof(),
      new NumberPlots(),
      new SignagePoint(),
    ];

    this.lastStatTime = new Date().getTime();
  }

  start() {
    this.tail.on("line", (line) => {
      console.log('line', line);
      this.handle(line, this.stats);
      this.stat();
    });
  }

  handle(line, stats) {
    this.handlers.forEach((hd, hdIndex) => {
      const evs = hd.handle(line, stats);
      evs.forEach(ev => {
        this.emit('dog', ev);
      });
    });
  }

  stat() {
    const now = new Date().getTime();
    if (now - this.lastStatTime > oneDay) {
      this.lastStatTime = now;

      this.stats.forEach((st, stIndex) => {
        const evs = st.getSummary();
        evs.forEach(ev => {
          this.emit('dailydog', ev);
        });
        st.reset();
      });
    }
  }
}

module.exports = ChiaWatchDog;