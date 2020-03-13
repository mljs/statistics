import sum from 'ml-array-sum';
import binarySearch from 'binary-search';

/**
 * Mann-Whitney rank test on sets x1 and x2
 *
 * https://en.wikipedia.org/wiki/Mann%E2%80%93Whitney_U_test
 *
 */

export function Ranking() {
  /* returns ranking of argument arrays
   */
  const args = Array.from(arguments);
  let concatArray = [];
  args.forEach((item) => {
    concatArray = concatArray.concat(item);
  });

  const sorted = concatArray.slice().sort((a, b) => b - a);
  const ranks = concatArray.map(
    (value) =>
      binarySearch(sorted, value, function(element, needle) {
        return needle - element;
      }) + 1,
  );

  return ranks;
}

export function Wilcoxon() {
  /* performes Wilcoxon test*/
  const args = Array.from(arguments);
  const ranks = Ranking.apply(null, arguments);
  let start_length = 0;
  const sums = args.map((item) => {
    start_length = start_length + item.length;
    let uu = sum(ranks.slice(start_length - item.length, start_length));
    return uu;
  });
  return sums;
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
    effectStrength: r,
    rankBiserial: rB,
    absolutValue: z,
  };
}

//console.log(TieCorrection([6, 4, 2, 5, 3, 1]));
console.log(uTest([1, 3, 5], [2, 4, 6]));

export function KruskalWallis() {
  /*
  Kruskal Wallis test
  */
  const ranks = Ranking(arguments);
  const T = TieCorrection(ranks);

  return Object;
}

const tA1 = [1, 2, 3];
const tA2 = [4, 5];
const tA3 = [6, 7, 8, 9, 10];
console.log(Wilcoxon(tA1, tA2, tA3));
