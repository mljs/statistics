import sum from 'ml-array-sum';

import { ranking } from './ranking';
import { tieCorrection } from './tieCorrection';

/** with default continuity correction (add later)
 * alternative is default: none (later can be added: two-sided, greater, less)
 * Method "Simple" is used for small samples
 * if wicoxon is true return only rank sums
 * @param {Array<number>} [x1]
 * @param {Array<number>} [x2]
 */
export function uTest(x1, x2) {
  const ranks = ranking(x1, x2);
  const n1 = x1.length;
  const n2 = x2.length;
  const U = n1 * n2;

  // simple U-test
  const u1 = sum(x1) - (n1 * (n1 + 1)) / 2;
  const u2 = U - u1;

  // Rank-biserial correlation
  const rankBiserial = 1 - (2 * u2) / U;

  // Stabdard Deviation and Absolute Value
  const T = tieCorrection(ranks);
  let sd = Math.sqrt((T * U * (n1 + n2 + 1)) / 12.0);
  const mRank = 0.5 + U / 2;
  const absolutValue = (Math.max(u1, u2) - mRank) / sd;

  // Effect strength
  const effectStrength = absolutValue / Math.sqrt(n1 + n2); // effect strength

  return {
    u1,
    u2,
    effectStrength,
    rankBiserial,
    absolutValue,
  };
}
