const LogParser = require('./LogParser');

class HarvesterParser extends LogParser {
  parse() {
    console.log('HarvesterParser parse');
  }
}

module.exports = HarvesterParser;