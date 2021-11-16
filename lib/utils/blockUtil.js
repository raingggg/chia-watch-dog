
const path = require('path');
const homedir = require('os').homedir();

const roll_over_point = 64;
const expected_diff_seconds = 9;
const smallest_expected_diff_seconds = 7;


const calculateSkippedSignagePoints = (prev_ts, prev_id, curr_ts, curr_id) => {
  // Calculate most likely amount of skipped signage points based on IDs and timestamps
  // If we detect out-of-order signage point event, the calculation is flagged as invalid.
  // :returns Validity and number of skipped signage points in case of valid calculation

  let valid = true;
  const diff_id = curr_id - prev_id;
  const diff_id_roll = (roll_over_point - prev_id) + curr_id;
  const diff_seconds = (curr_ts - prev_ts) / 1000;

  const one_roll_duration = roll_over_point * expected_diff_seconds;

  const roll_count = Math.round(diff_seconds / one_roll_duration);
  let expected_diff_id = Math.round(diff_seconds / expected_diff_seconds);
  expected_diff_id = expected_diff_id % one_roll_duration;

  const distance_to_expected = Math.abs(expected_diff_id - diff_id);
  const distance_to_expected_roll = Math.abs(expected_diff_id - diff_id_roll);

  let skipped = 0;
  if (distance_to_expected < distance_to_expected_roll)
    skipped = (diff_id + roll_over_point * roll_count) - 1;
  else
    skipped = (diff_id_roll + roll_over_point * roll_count) - 1;

  // Handle possible bursts of shuffled signage points resulting from a fork
  const upper_bound_expected_diff_id = Math.round(diff_seconds / smallest_expected_diff_seconds)

  if (skipped < 0) {
    valid = false;
    skipped = 0;
  } else if (skipped > upper_bound_expected_diff_id) {
    valid = false;
    skipped = 0;
  }

  return { valid, skipped };
};

const getLogFilePath = (filePath) => {
  if (!filePath) return path.resolve(homedir, '.chia/mainnet/log/debug.log');

  if (filePath.startsWith('/')) return filePath;

  return path.resolve(homedir, filePath);
};

module.exports = {
  calculateSkippedSignagePoints,
  getLogFilePath
};