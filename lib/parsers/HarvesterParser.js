const LogParser = require('./LogParser');

class HarvesterParser extends LogParser {
  parse(line) {
    console.log('HarvesterParser parse');
  }
}

module.exports = HarvesterParser;