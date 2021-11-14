const LogParser = require('./LogParser');

class WalletParser extends LogParser {
  parse(line) {
    console.log('WalletParser parse');
  }
}

module.exports = WalletParser;