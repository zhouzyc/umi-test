/**
 * 我是Jest函数测试
 * https://jestjs.io/docs/zh-Hans/getting-started
 */
import {sum}  from '../src/utils/utils';

describe('开始测试', (): void => {
  it('sum(2 + 2) 等于 4', (): void => {
    expect(sum(2, 2)).toBe(4);
  });

});


