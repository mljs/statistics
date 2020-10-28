import sum from 'ml-array-sum';

import { ranking } from './ranking';

export function wilcoxon() {
  /* performes Wilcoxon test*/
  const args = Array.from(arguments);
  const ranks = ranking.apply(null, arguments);
  let start_length = 0;
  const sums = args.map((item) => {
    start_length = start_length + item.length;
    let uu = sum(ranks.slice(start_length - item.length, start_length));
    return uu;
  });
  return sums;
}
