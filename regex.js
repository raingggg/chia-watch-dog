const REG_CWD = {
  REG_BLOCK_FOUND: /([0-9:.]*) full_node (?:src|chia).full_node.full_node\s*: INFO\s* ((?:🍀|.)\s* Farmed unfinished_block)/,
  REG_SIGN_POINT: /([0-9:.]*) full_node (?:src|chia).full_node.full_node(?:\s?): INFO\s*(?:⏲️|.)[a-z A-Z,]* ([0-9]*)\/64/,
  REG_PARTIAL: /([0-9:.]*) farmer (?:src|chia).farmer.farmer\s*: INFO\s* (Submitting partial)/,
  REG_ADD_COIN_1: /([0-9:.]*) wallet (?:src|chia).wallet.wallet_state_manager(?:\s?): /,
  REG_ADD_COIN_2: /INFO\s*Adding coin: {'amount': ([0-9]*),/,
  REG_PLOTS_1: /([0-9:.]*) harvester (?:src|chia).harvester.harvester(?:\s?): INFO\s*([0-9]+) plots were /,
  REG_PLOTS_2: /eligible for farming ([0-9a-z.]*) Found ([0-9]) proofs. Time: ([0-9.]*) s. /,
  REG_PLOTS_3: /Total ([0-9]*) plots/,
};

module.exports = {
  REG_BLOCK_FOUND,
  REG_SIGN_POINT,
  REG_PARTIAL,
  REG_ADD_COIN_1,
  REG_ADD_COIN_2,
  REG_PLOTS_1,
  REG_PLOTS_2,
  REG_PLOTS_3,
};