const { REG_BLOCK_FOUND } = require('../utils/regex');

class BlockParser {
  parse(line) {
    console.log('BlockParser parse');
    const match = REG_BLOCK_FOUND.exec(line);
    if (match) {
      return { timestamp: new Date(match[0]).getTime(), blocksCount: 1 };
    }
  }
}

module.exports = BlockParser;