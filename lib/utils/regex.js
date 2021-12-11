const REG_CWD = {
  REG_BLOCK_FOUND: /([-T0-9:.]*) full_node \w*:?\s*?(?:\w+).full_node.full_node\s*: INFO\s* ((?:🍀|.)\s* ️Farmed unfinished_block)/,
  REG_SIGN_POINT: /([-T0-9:.]*) full_node \w*:?\s*?(?:\w+).full_node.full_node(?:\s?): INFO\s*(?:⏲️|.)[a-z A-Z,]* ([0-9]*)\/64/,
  REG_PARTIAL: /([-T0-9:.]*) farmer \w*:?\s*?(?:\w+).farmer.farmer\s*: INFO\s* (Submitting partial)/,
  REG_ADD_COIN: /([-T0-9:.]*) wallet \w*:?\s*?(?:\w+).wallet.wallet_state_manager(?:\s?): INFO\s*Adding coin: {'amount': ([0-9]*),/,
  REG_PLOTS: /([-T0-9:.]*) harvester \w*:?\s*?(?:\w+).harvester.harvester(?:\s?): INFO\s*([0-9]+) plots were eligible for farming ([0-9a-z.]*) Found ([0-9]) proofs. Time: ([0-9.]*) s. Total ([0-9]*) plots/,
};

module.exports = REG_CWD;