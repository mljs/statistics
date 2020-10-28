import { uTest } from '../uTest';

describe('uTest', () => {
  it('simple case', () => {
    let array1 = [1, 3, 5];
    let array2 = [2, 4, 6];
    let result = uTest(array1, array2, 'Simple');
    expect(result).toStrictEqual({ u1: 6, u2: 3 });
  });
});
