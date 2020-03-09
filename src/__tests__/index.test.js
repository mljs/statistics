import { uTest, TieCorrection } from '..';

describe('uTest', () => {
  it('simple case', () => {
    let array1 = [1, 3, 5];
    let array2 = [2, 4, 6];

    let result = uTest(array1, array2);

    expect(result).toStrictEqual({ uStatistic: 3, pValue: 9 });
  });
});

describe('tie correction', () => {
  it('simple case with two ranks', () => {
    let ranks = [[1, 2.5, 2.5, 4]];

    let result = TieCorrection(ranks);

    expect(result).toStrictEqual(0.9);
  });
});
