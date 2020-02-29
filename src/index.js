import sum from 'ml-array-sum';
import binarySearch from 'binary-search';

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
  const leftArr = sortedArr.slice(1, test_array.length);
  const rightArr = sortedArr.slice(0, test_array.length - 1);
  const nonNegative = [0, leftArr.join('').localeCompare(rightArr.join('')), 0];
  const nonNegativeIdxs = nonNegative
    .map((a, i) => (a == 0 ? i : -1))
    .filter((a) => a !== -1);
  //const nonNegativeIdxs =

  return Object;
}

export function uTest(x1, x2) {
  const concatArray = x1.concat(x2);
  const sorted = concatArray.slice().sort((a, b) => b - a);
  const ranks = concatArray.map(
    (value) =>
      binarySearch(sorted, value, function(element, needle) {
        return needle - element;
      }) + 1,
  );

  const ranksX1 = ranks.slice(0, x1.length);
  const u1 = sum(ranksX1);

  const u2 = sum(ranks) - u1;

  /*T tie correct*/

  const sd = Math.sqrt((T * n1 * n2 * (n1 + n2 + 1)) / 12.0);

  return { u1, u2 };
}

const test_array = [1, 2, 5, 6, 7];
const test_array_2 = [0, -1, 0, 0];

console.log(test_array.slice(1, test_array.length - 1));
console.log(
  test_array_2.map((a, i) => (a == 0 ? i : -1)).filter((a) => a !== -1),
);
