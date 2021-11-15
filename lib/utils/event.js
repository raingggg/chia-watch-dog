const PRIORITY_LOW = 'low';
const PRIORITY_NORMAL = 'normal';
const PRIORITY_HIGH = 'high';

const TYPE_KEEPALIVE = 'TYPE_KEEPALIVE';
const TYPE_USER = 'TYPE_USER';
const TYPE_DAILY_STATS = 'TYPE_DAILY_STATS';

const SERVICE_HARVESTER = 'SERVICE_HARVESTER';
const SERVICE_FARMER = 'SERVICE_FARMER';
const SERVICE_FULL_NODE = 'SERVICE_FULL_NODE';
const SERVICE_DAILY = 'SERVICE_DAILY';
const SERVICE_WALLET = 'SERVICE_WALLET';

const EVT_NO_EVENTS = 'EVT_NO_EVENTS';
const EVT_PLOT_DECREASE = 'EVT_PLOT_DECREASE';
const EVT_NO_CHALLENGE = 'EVT_NO_CHALLENGE';
const EVT_PLOT_LONG = 'EVT_PLOT_LONG';
const EVT_SKIP_POINT = 'EVT_SKIP_POINT';
const EVT_BLOCK_FOUND = 'EVT_BLOCK_FOUND';
const EVT_RECEIVE_COIN = 'EVT_RECEIVE_COIN';

const EVT_DAILY_RECEIVE_COIN = 'EVT_DAILY_RECEIVE_COIN';
const EVT_DAILY_PROOF_FOUND = 'EVT_DAILY_PROOF_FOUND';
const EVT_DAILY_PARITAL_SUBMITTED = 'EVT_DAILY_PARITAL_SUBMITTED';
const EVT_DAILY_BLOCK_FOUND = 'EVT_DAILY_BLOCK_FOUND';
const EVT_DAILY_DISK_SEARCH = 'EVT_DAILY_DISK_SEARCH';
const EVT_DAILY_NUMBER_PLOTS = 'EVT_DAILY_NUMBER_PLOTS';
const EVT_DAILY_ELIGIGLE_PLOTS = 'EVT_DAILY_ELIGIGLE_PLOTS';
const EVT_DAILY_SKIP_POINT = 'EVT_DAILY_SKIP_POINT';

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

  EVT_NO_EVENTS,
  EVT_PLOT_DECREASE,
  EVT_NO_CHALLENGE,
  EVT_PLOT_LONG,
  EVT_SKIP_POINT,
  EVT_BLOCK_FOUND,
  EVT_RECEIVE_COIN,

  EVT_DAILY_RECEIVE_COIN,
  EVT_DAILY_PROOF_FOUND,
  EVT_DAILY_PARITAL_SUBMITTED,
  EVT_DAILY_BLOCK_FOUND,
  EVT_DAILY_DISK_SEARCH,
  EVT_DAILY_NUMBER_PLOTS,
  EVT_DAILY_ELIGIGLE_PLOTS,
  EVT_DAILY_SKIP_POINT,

  CWDEvent,
};