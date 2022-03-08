import sum from 'ml-array-sum';

import { ranking } from './ranking';

export function wilcoxon(...args) {
  /* performes Wilcoxon test*/
  const ranks = ranking(...args);
  let startLength = 0;
  const sums = args.map((item) => {
    startLength = startLength + item.length;
    let uu = sum(ranks.slice(startLength - item.length, startLength));
    return uu;
  });
  return sums;
}
