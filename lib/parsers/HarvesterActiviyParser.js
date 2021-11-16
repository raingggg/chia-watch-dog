const { REG_PLOTS } = require('../utils/regex');
const { logger } = require('../utils/logger');

class HarvesterActivityParser {
  parse(line) {
    const match = REG_PLOTS.exec(line);
    if (match) {
      logger.debug('HarvesterActivityParser', [match[1], match[2], match[3], match[4], match[5], match[6]]);
      return {
        timestamp: new Date(match[1]).getTime(),
        eligiblePlotsCount: parseFloat(match[2]),
        challengeHash: match[3],
        foundProofsCount: parseFloat(match[4]),
        searchTimeSeconds: parseFloat(match[5]),
        totalPlotsCount: parseFloat(match[6]),
      };
    }
  }
}

module.exports = HarvesterActivityParser;