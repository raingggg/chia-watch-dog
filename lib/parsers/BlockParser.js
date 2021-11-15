const { REG_BLOCK_FOUND } = rquire('../utils/regex');

class BlockParser {
  parse(line) {
    const ms = [];

    console.log('BlockParser parse');
    const match = REG_BLOCK_FOUND.exec(line);
    if (match) {
      ms.push({ timestamp: match[0], blocksCount: 1 });
    }

    return ms;
  }
}

module.exports = BlockParser;