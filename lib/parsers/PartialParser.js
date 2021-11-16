const { REG_PARTIAL } = require('../utils/regex');
const { logger } = require('../utils/logger');

class PartialParser {
  parse(line) {
    const match = REG_PARTIAL.exec(line);
    if (match) {
      logger.debug('PartialParser', );
      return { timestamp: new Date(match[1]).getTime(), partialsCount: 1 };
    }
  }
}

module.exports = PartialParser;