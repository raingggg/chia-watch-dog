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
const isTestMode = process.env['TEST_CWD'];

class ChiaWatchDog extends EventEmitter {
  constructor(filePath) {
    super();

    this.chiaLogPath = getLogFilePath(filePath);
    this.samplePercentage = 100;

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
      if (Math.ceil(Math.random() * 100) <= this.samplePercentage) {
        logger.debug('line', line);
        this.handle(line, this.stats);
        this.stat();
      }
    });
  }

  handle(line, stats) {
    let evs = [];
    this.handlers.forEach((hd, hdIndex) => {
      try {
        const hdEvs = hd.handle(line, stats);
        evs = evs.concat(hdEvs);
      } catch (e) {
        logger.error(e);
      }
    });

    if (evs.length > 0) {
      this.emit('dog', evs);
    }
  }

  stat() {
    const date = new Date();
    const now = date.getTime();
    const shouldStatTestMode = isTestMode && (date.getMinutes() % 5 === 0);
    const isNewDay = (now - this.lastStatTime > oneDay);
    if (shouldStatTestMode || isNewDay) {
      this.lastStatTime = now;

      let evs = [];
      this.stats.forEach((st, stIndex) => {
        try {
          const stEvs = st.getSummary();
          evs = evs.concat(stEvs);
          st.reset();
        } catch (e) {
          logger.error(e);
        }
      });

      if (evs.length > 0) {
        this.emit('dailydog', evs);
      }
    }
  }

  sampleWithPercentate(samplePercentage) {
    this.samplePercentage = samplePercentage;
  }
}

module.exports = ChiaWatchDog;