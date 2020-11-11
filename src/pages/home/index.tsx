import React from 'react';
import styles from './index.less';
import { Pagination,Tag } from 'antd';
import { Helmet, useAccess, Access, useModel,useIntl, request } from 'umi';


function home() {
  //plugin-model 获取全局状态
  const { globalInfo, getGlobalInfo } = useModel('useGlobalModel');
  const { initialState,loading} = useModel('@@initialState');
  if(loading){
    return ;
  }
  console.log(initialState);

  //约定全局权限状态获取
  const access = useAccess();

  if (access.authShow) {
    // 如果可以读取 Foo，则...
  }

  //国际化
  const intl = useIntl();
  let msg = intl.formatMessage({
    id: 'WELCOME_TO_UMI_WORLD',
  },{
    name:"ddddd",
    age:22
  });
  console.log(msg);


  return (
    <div>
      <Helmet>
        <meta charSet="utf-8"/>
        <title>My Title</title>
        <link rel="canonical" href="http://mysite.com/example"/>
      </Helmet>
      <h1 className={styles.title}>我是首页了</h1>
      <Access
        accessible={access.authShow}
        fallback={<div>我没有看的权限了</div>}
      >
        <div>我拥有看的权限了</div>
      </Access>
      <Access
        accessible={access.canUpdateFoo}
        fallback={<div>我不能更新操作.</div>}
      >
        <div>我可以跟新操作</div>
      </Access>
      <Access
        accessible={access.canDeleteFoo(1)}
        fallback={<div>我不能删除</div>}
      >
        我能删除
      </Access>
      <Tag  color="#55acee">
        Twitter
      </Tag>
      <Pagination defaultCurrent={6} total={500} />
    </div>
  );
};


// home.title = '我设置了标题';

export default home;

