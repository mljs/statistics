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

export function Ranking(x1, x2) {
  /* returns ranking of two arrays
   */

  const concatArray = x1.concat(x2);
  const sorted = concatArray.slice().sort((a, b) => b - a);
  const ranks = concatArray.map(
    (value) =>
      binarySearch(sorted, value, function(element, needle) {
        return needle - element;
      }) + 1,
  );

  return ranks;
}

export function Wilcoxon(x1, x2) {
  /* performes Wilcoxon test*/
  ranks = Ranking(x1, x2);
  n1 = x1.length;
  return {
    u1: sum(ranks.slice(0, n1)),
    u2: sum(ranks) - sum(ranks.slice(0, n1)),
  };
}

export function TieCorrection(rankValues) {
  /** Needed for the U-Test and H-Test
   * IN: rankValues: 1D array of ranks
   * OUT: factor: correction factor
   */
  if (rankValues.length < 2) {
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
    .map(function(num, idx) {
      return num - nonNegativeIdxs.slice(0, nonNegativeIdxs.length - 1)[idx];
    });

  return (
    1 -
    (Math.pow(diffCounter, 3) - diffCounter) /
      (Math.pow(sortedArr.length, 3) - sortedArr.length)
  );
}

export function uTest(x1, x2, method) {
  /** with default continuity correction (add later)
   * alternative is default: none (later can be added: two-sided, greater, less)
   * Method "Simple" is used for small samples
   * if wicoxon is true return only rank sums
   */
  const ranks = Ranking(x1, x2);
  const n1 = x1.length;
  const n2 = x2.length;
  const U = n1 * n2;

  // simple U-test
  const u1 = sum(x1) - (n1 * (n1 + 1)) / 2;
  const u2 = U - u1;
  if (method === 'Simple') {
    return { u1, u2 };
  }

  // Rank-biserial correlation
  const rB = 1 - (2 * u2) / U;

  // Stabdard Deviation and Absolute Value
  const T = TieCorrection(ranks);
  let sd = Math.sqrt((T * U * (n1 + n2 + 1)) / 12.0);
  const mRank = 0.5 + U / 2;
  const z = (Math.max(u1, u2) - mRank) / sd;

  // Effect strength
  const r = z / Math.sqrt(n1 + n2); // effect strength

  return {
    u1: u1,
    u2: u2,
    standardDeviation: sd,
    effectStrength: r,
    rankBiserial: rB,
    absolutValue: z,
  };
}

//console.log(TieCorrection([6, 4, 2, 5, 3, 1]));
console.log(uTest([1, 3, 5], [2, 4, 6]));

export function hTest() {
  return Object;
}
