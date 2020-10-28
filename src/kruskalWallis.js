import sum from 'ml-array-sum';

import { ranking } from './ranking';
import { tieCorrection } from './tieCorrection';

export function kruskalWallis() {
  /*
  Kruskal Wallis test
  */
  const args = Array.from(arguments);
  const ranks = ranking.apply(null, arguments);
  const T = tieCorrection(ranks);
  const sbnn = sum(args.map((item) => sum(item) / item.length));
  const N = sum(args.map((item) => item.length));
  const H = (12 / (N * (N + 1))) * sbnn - 3 * (N + 1);
  const df = args.length - 1;
  const Ht = H / T;

  return { H, df, Ht, sbnn };
}
