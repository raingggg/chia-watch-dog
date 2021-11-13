const LogParser = require('./LogParser');

class FullnodeParser extends LogParser {
  parse() {
    console.log('FullnodeParser parse');
  }
}

module.exports = FullnodeParser;