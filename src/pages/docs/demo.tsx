/**
 * motions:
 *  - click:[data-action="addon"]
 *  - timeout:1000
 *  - click:[data-action="addon"]
 *  - timeout:1000
 *  - click:[data-action="reset"]
 */
import React, { useState } from 'react';
export default () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <p>{count}</p>
      <button type="button" data-action="addon" onClick={() => setCount(count + 1)}>
        增加
      </button>
      <button type="button" data-action="reset" onClick={() => setCount(0)}>
        重置
      </button>
    </>
  );
};
