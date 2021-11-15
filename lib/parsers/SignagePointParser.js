const { REG_SIGN_POINT } = rquire('../utils/regex');

class SignagePointParser {
  parse(line) {
    console.log('SignagePointParser parse');
    const match = REG_SIGN_POINT.exec(line);
    if (match) {
      return { timestamp: new Date(match[0]).getTime(), signagePoint: match[1] };
    }
  }
}

module.exports = SignagePointParser;