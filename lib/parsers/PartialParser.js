const { REG_PARTIAL } = require('../utils/regex');
const { logger } = require('../utils/logger');

class PartialParser {
  parse(line) {
    logger.debug('PartialParser parse');
    const match = REG_PARTIAL.exec(line);
    logger.info(match);
    if (match) {
      return { timestamp: new Date(match[0]).getTime(), partialsCount: 1 };
    }
  }
}

module.exports = PartialParser;