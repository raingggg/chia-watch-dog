const PRIORITY_LOW = 'low';
const PRIORITY_NORMAL = 'normal';
const PRIORITY_HIGH = 'high';

const TYPE_KEEPALIVE = 'keepalive';
const TYPE_USER = 'user';
const TYPE_DAILY_STATS = 'dailystats';

const SERVICE_HARVESTER = 'harvester';
const SERVICE_FARMER = 'farmer';
const SERVICE_FULL_NODE = 'fullnode';
const SERVICE_DAILY = 'daily';
const SERVICE_WALLET = 'wallet';

class CWDEvent {
  constructor(type, priority, service, message) {
    this.type = type;
    this.priority = priority;
    this.service = service;
    this.message = message;
  }
}

class CWDMessage {
  constructor(time, data) {
    this.time = time;
    this.data = data;
  }
}

module.exports = {
  PRIORITY_LOW,
  PRIORITY_NORMAL,
  PRIORITY_HIGH,

  TYPE_KEEPALIVE,
  TYPE_USER,
  TYPE_DAILY_STATS,

  SERVICE_HARVESTER,
  SERVICE_FARMER,
  SERVICE_FULL_NODE,
  SERVICE_DAILY,
  SERVICE_WALLET,

  CWDEvent,
};