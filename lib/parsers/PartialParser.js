const { REG_PARTIAL } = rquire('../utils/regex');

class PartialParser {
  parse(line) {
    const ms = [];

    console.log('PartialParser parse');
    const match = REG_PARTIAL.exec(line);
    if (match) {
      ms.push({ timestamp: new Date(match[0]).getTime(), partialsCount: 1 });
    }

    return ms;
  }
}

module.exports = PartialParser;