import binarySearch from 'binary-search';

/**
 * Mann-Whitney rank test on sets x1 and x2
 *
 * https://en.wikipedia.org/wiki/Mann%E2%80%93Whitney_U_test
 *
 */
/**
 * returns ranking of argument arrays
 */

export function ranking(...args) {
  let concatArray = [];
  args.forEach((item) => {
    concatArray = concatArray.concat(item);
  });

  const sorted = concatArray.slice().sort((a, b) => b - a);
  const ranks = concatArray.map(
    (value) =>
      binarySearch(sorted, value, (element, needle) => {
        return needle - element;
      }) + 1,
  );

  return ranks;
}
