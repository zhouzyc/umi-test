//我是约定式路由的layoutes
import React from 'react';

export default function(props: { location: { pathname: string; }; children: {} | null | undefined; }) {
  console.log("我是独立layouts钩子。");
  return (
    <>
      <div>我是嵌套路由 _layout 公用头部</div>
      { props.children }
      <div>我是嵌套路由 _layout 公用底部</div>
    </>
  );
}
