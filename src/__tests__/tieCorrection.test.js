import { tieCorrection } from '../tieCorrection';

describe('tie correction', () => {
  it('simple case with two ranks', () => {
    let ranks = [1, 2.5, 2.5, 4];
    let result = tieCorrection(ranks);
    expect(result).toBe(0.9);
  });

  it('one element', () => {
    let ranks = [2];
    let result = tieCorrection(ranks);
    expect(result).toBe(1);
  });

  it('zero element', () => {
    let ranks = [];
    expect(() => {
      tieCorrection(ranks);
    }).toThrow('tieCorrection: array length should be greater than 0');
  });
});
