const REG_CWD = {
  REG_BLOCK_FOUND: /([0-9:.]*) full_node (?:src|chia).full_node.full_node\s*: INFO\s* ((?:🍀|.)\s* Farmed unfinished_block)/,
  REG_SIGN_POINT: /([0-9:.]*) full_node (?:src|chia).full_node.full_node(?:\s?): INFO\s*(?:⏲️|.)[a-z A-Z,]* ([0-9]*)\/64/,
  REG_PARTIAL: /([0-9:.]*) farmer (?:src|chia).farmer.farmer\s*: INFO\s* (Submitting partial)/,
  REG_ADD_COIN: /([0-9:.]*) wallet (?:src|chia).wallet.wallet_state_manager(?:\s?): INFO\s*Adding coin: {'amount': ([0-9]*),/,
  REG_PLOTS: /([0-9:.]*) harvester (?:src|chia).harvester.harvester(?:\s?): INFO\s*([0-9]+) plots were eligible for farming ([0-9a-z.]*) Found ([0-9]) proofs. Time: ([0-9.]*) s. Total ([0-9]*) plots/,
};

module.exports = {
  REG_BLOCK_FOUND,
  REG_SIGN_POINT,
  REG_PARTIAL,
  REG_ADD_COIN,
  REG_PLOTS
};