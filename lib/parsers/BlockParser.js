const { REG_BLOCK_FOUND } = require('../utils/regex');
const { logger } = require('../utils/logger');

class BlockParser {
  parse(line) {
    logger.debug('BlockParser parse');
    const match = REG_BLOCK_FOUND.exec(line);
    logger.info(match);
    if (match) {
      return { timestamp: new Date(match[0]).getTime(), blocksCount: 1 };
    }
  }
}

module.exports = BlockParser;