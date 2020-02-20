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
  return { u1, u2 };
}
