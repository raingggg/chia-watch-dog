const { REG_SIGN_POINT } = require('../utils/regex');
const { logger } = require('../utils/logger');

class SignagePointParser {
  parse(line) {
    logger.debug('SignagePointParser parse');
    const match = REG_SIGN_POINT.exec(line);
    logger.info(match);
    if (match) {
      return { timestamp: new Date(match[0]).getTime(), signagePoint: match[1] };
    }
  }
}

module.exports = SignagePointParser;