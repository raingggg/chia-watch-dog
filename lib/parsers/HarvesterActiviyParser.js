const { REG_PLOTS } = rquire('../utils/regex');

class HarvesterActivityParser {
  parse(line) {
    const ms = [];

    console.log('BlockParser parse');
    const match = REG_PLOTS.exec(line);
    if (match) {
      ms.push({
        timestamp: match[0],
        eligiblePlotsCount: match[1],
        challengeHash: match[2],
        foundProofsCount: match[3],
        searchTimeSeconds: match[4],
        totalPlotsCount: match[5],
      });
    }

    return ms;
  }
}

module.exports = HarvesterActivityParser;