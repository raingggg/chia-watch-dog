const LogParser = require('./LogParser');

class FullnodeParser extends LogParser {
  parse(line) {
    console.log('FullnodeParser parse');
  }
}

module.exports = FullnodeParser;