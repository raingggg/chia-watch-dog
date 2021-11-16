const { REG_PLOTS } = require('../utils/regex');
const { logger } = require('../utils/logger');

class HarvesterActivityParser {
  parse(line) {
    logger.debug('HarvesterActivityParser parse');
    const match = REG_PLOTS.exec(line);
    logger.info(match);
    if (match) {
      return {
        timestamp: new Date(match[0]).getTime(),
        eligiblePlotsCount: match[1],
        challengeHash: match[2],
        foundProofsCount: match[3],
        searchTimeSeconds: match[4],
        totalPlotsCount: match[5],
      };
    }
  }
}

module.exports = HarvesterActivityParser;