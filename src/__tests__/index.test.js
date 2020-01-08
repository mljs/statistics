import { myModule } from '..';

describe('test myModule', () => {
  it('should return 42', () => {
    expect(myModule(2, 3)).toStrictEqual(5);
  });
});
