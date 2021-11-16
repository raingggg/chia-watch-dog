const { REG_BLOCK_FOUND } = require('../utils/regex');
const { logger } = require('../utils/logger');

class BlockParser {
  parse(line) {
    const match = REG_BLOCK_FOUND.exec(line);
    if (match) {
      logger.debug('BlockParser', match[1]);
      return { timestamp: new Date(match[1]).getTime(), blocksCount: 1 };
    }
  }
}

module.exports = BlockParser;