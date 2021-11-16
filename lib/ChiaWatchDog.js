const { EventEmitter } = require('events');
const { Tail } = require('tail');
const { logger } = require('./utils/logger');
const { getLogFilePath } = require('./utils/blockUtil');
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
} = require('./stats');

const oneDay = 1000 * 60 * 60 * 24;

class ChiaWatchDog extends EventEmitter {
  constructor(filePath) {
    super();

    this.chiaLogPath = getLogFilePath(filePath);

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

    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    this.lastStatTime = date.getTime();
  }

  start() {
    logger.debug('chia-watch-dog working...');
    logger.debug('chiaLogPath', this.chiaLogPath);

    this.tail = new Tail(this.chiaLogPath);
    this.tail.on("line", (line) => {
      logger.debug('line', line);
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

      let evs = [];
      this.stats.forEach((st, stIndex) => {
        evs = evs.concat(st.getSummary());
        st.reset();
      });

      if (evs.length > 0) {
        this.emit('dailydog', evs);
      }
    }
  }
}

module.exports = ChiaWatchDog;