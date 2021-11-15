const { REG_PLOTS } = rquire('../utils/regex');

class HarvesterActivityParser {
  parse(line) {
    console.log('HarvesterActivityParser parse');
    const match = REG_PLOTS.exec(line);
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