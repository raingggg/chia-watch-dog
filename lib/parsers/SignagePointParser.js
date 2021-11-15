const { REG_SIGN_POINT } = rquire('../utils/regex');

class SignagePointParser {
  parse(line) {
    const ms = [];

    console.log('SignagePointParser parse');
    const match = REG_SIGN_POINT.exec(line);
    if (match) {
      ms.push({ timestamp: new Date(match[0]).getTime(), signagePoint: match[1] });
    }

    return ms;
  }
}

module.exports = SignagePointParser;