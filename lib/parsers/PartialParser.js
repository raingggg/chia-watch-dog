const { REG_PARTIAL } = rquire('../utils/regex');

class PartialParser {
  parse(line) {
    console.log('PartialParser parse');
    const match = REG_PARTIAL.exec(line);
    if (match) {
      return { timestamp: new Date(match[0]).getTime(), partialsCount: 1 };
    }
  }
}

module.exports = PartialParser;