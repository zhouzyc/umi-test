/**
 * title: 组件使用实例
 * desc: 我是简介，我可以用 `Markdown` 来编写
 *
 *
 * motions:
 *  - click:[data-action="addon"]
 *  - timeout:1000
 *  - click:[data-action="addon"]
 *  - timeout:1000
 *  - click:[data-action="reset"]
 */
import React, { useState } from 'react';

/**
 * demo properties.
 */
export interface IDemoProps {
  /**
   * 用户名
   */
  name: string;
  /**
   * 年龄
   */
  age?: number;
  /**
   * 工作
   * @default doctor
   */
  work?: string;
  /**
   * 修改名字
   * @param name
   */
  changeName?: (name: string) => void;

  type: 'submit' | 'button';

  /**
   * 尺寸
   * @deprecated 使用 size2 替代
   */
  size?: 'small' | 'default';

  /**
   * 新的尺寸
   * @since 1.1.0
   * @default large
   */
  size2?: 'small' | 'large';
}

function demo(props: IDemoProps) {
  const [count, setCount] = useState(0);

  /**
   * 点击事件
   * @public
   */
  const handledClick = (e: any) => {
    setCount(count + 1);
  };

  return (
    <>
      <p>{count}</p>
      <button type="button" data-action="addon" onClick={handledClick}>
        增加
      </button>
      <button type="button" data-action="reset" onClick={() => setCount(0)}>
        重置
      </button>
    </>
  );
}

export default demo;
