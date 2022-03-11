import { isAnyArray } from 'is-any-array';

/**
 * Needed for the U-Test and H-Test
 * @param {Array<number>} [rankValues] 1D array of ranks
 * @returns {number} correction factor
 */
export function tieCorrection(rankValues) {
  if (!isAnyArray(rankValues) || rankValues.length === 0) {
    throw new Error('tieCorrection: array length should be greater than 0');
  }
  if (rankValues.length === 1) {
    return 1;
  }

  const sortedArr = rankValues.slice().sort((a, b) => b - a);
  const leftArr = sortedArr.slice(1, sortedArr.length);
  const rightArr = sortedArr.slice(0, sortedArr.length - 1);
  const nonNegative = [0, leftArr.join('').localeCompare(rightArr.join('')), 0];
  const nonNegativeIdxs = nonNegative
    .map((a, i) => (a === 0 ? i : -1))
    .filter((a) => a !== -1);
  let diffCounter = nonNegativeIdxs
    .slice(1, nonNegativeIdxs.length)
    .map((num, idx) => {
      return num - nonNegativeIdxs.slice(0, nonNegativeIdxs.length - 1)[idx];
    });

  return (
    1 -
    (Math.pow(diffCounter, 3) - diffCounter) /
      (Math.pow(sortedArr.length, 3) - sortedArr.length)
  );
}
