const LogParser = require('./LogParser');

class WalletParser extends LogParser {
  parse() {
    console.log('WalletParser parse');
  }
}

module.exports = WalletParser;