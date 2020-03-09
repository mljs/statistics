import sum from 'ml-array-sum';
import binarySearch from 'binary-search';
//import { Matrix } from 'ml-matrix';

/**
 * Mann-Whitney rank test on sets x1 and x2
 *
 * https://en.wikipedia.org/wiki/Mann%E2%80%93Whitney_U_test
 *
 * @param {Array} [x1]
 * @param {Array} [x2]
 * @return {object}
 */

export function TieCorrection(rankValues) {
  /** Needed for the U-Test and H-Test
   * IN: rankValues: 1D array of ranks
   * OUT: factor: correction factor
   */
  const sortedArr = rankValues.slice().sort((a, b) => b - a);
  if (sortedArr.length < 2) {
    return 1;
  }
  const leftArr = sortedArr.slice(1, sortedArr.length);
  const rightArr = sortedArr.slice(0, sortedArr.length - 1);
  const nonNegative = [0, leftArr.join('').localeCompare(rightArr.join('')), 0];
  const nonNegativeIdxs = nonNegative
    .map((a, i) => (a == 0 ? i : -1))
    .filter((a) => a !== -1);
  var diffCounter = nonNegativeIdxs
    .slice(1, nonNegativeIdxs.length)
    .map(function(num, idx) {
      return num - nonNegativeIdxs.slice(0, nonNegativeIdxs.length - 1)[idx];
    });
  const sortedArrSize = sortedArr.length;
  const tieCorr =
    1 -
    (Math.pow(diffCounter, 3) - diffCounter) /
      (Math.pow(sortedArrSize, 3) - sortedArrSize);
  return tieCorr;
}

export function uTest(x1, x2, method) {
  /** with default continuity correction (add later)
   * alternative is default: none (later can be added: two-sided, greater, less)
   * Method One is used for small samples
   */
  const concatArray = x1.concat(x2);
  const sorted = concatArray.slice().sort((a, b) => b - a);
  const ranks = concatArray.map(
    (value) =>
      binarySearch(sorted, value, function(element, needle) {
        return needle - element;
      }) + 1,
  );
  const n1 = x1.length;
  const n2 = x2.length;
  const ranksX1 = ranks.slice(0, n1);
  const u1 = n1 * n2 + (n1 * (n1 + 1)) / 2 - sum(ranksX1);
  const u2 = n1 * n2 - u1;
  if (method == 'Simple') {
    return { u1, u2 };
  }

  const T = TieCorrection(concatArray);
  var sd = 0;
  if (T == 0) {
    console.log('The objects are identical');
  } else {
    sd = Math.sqrt((T * n1 * n2 * (n1 + n2 + 1)) / 12.0);
  }
  const mRank = 0.5 + (n1 * n2) / 2;
  const z = (Math.max(u1, u2) - mRank) / sd;
  return { u1, u2, T, z };
}

console.log(TieCorrection([6, 4, 2, 5, 3, 1]));
console.log(uTest([1, 3, 5], [2, 4, 6]));
