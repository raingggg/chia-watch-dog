const { REG_SIGN_POINT } = require('../utils/regex');
const { logger } = require('../utils/logger');

class SignagePointParser {
  parse(line) {
    const match = REG_SIGN_POINT.exec(line);
    if (match) {
      logger.debug('SignagePointParser', [match[1], match[2]]);
      return { timestamp: new Date(match[1]).getTime(), signagePoint: parseFloat(match[2]) };
    }
  }
}

module.exports = SignagePointParser;