/**
 * 我是约定入口文件
 */
import React from 'react';
import { history } from 'umi';
import { createLogger } from 'redux-logger';
import { message } from 'antd';
import { routes as routesConfig } from '../config/route';
import requestConfig from '@/services/config'
import { isLogin } from '@/services';
import { DefaultFooter,PageContainer } from '@ant-design/pro-layout';
import ErrorBoundary from '@/components/ErrorBoundary';


// 渲染之前做事情 启动应用执行一次
export function render(oldRender: () => void) {
  console.log("我是渲染事前的钩子");
  oldRender();
}

// 修改交给 react-dom 渲染时的根组件。我可以作为全局 组件引用
// @ts-ignore
export function rootContainer(container:any, props) {
  console.log("插入全局包围组件");
  return React.createElement(ErrorBoundary, props, container);
}

// 全局初始化调用约定方法、可以作为全局进入登陆使用 返回登陆后的用户数据。启动应用执行一次
export async function getInitialState() {
  console.log("启动应用进入页面");
  if(
    history.location.pathname !== '/signInM'
    && history.location.pathname !== '/signIn'
    && history.location.pathname !== '/404'
  ){
    let res = await isLogin();
    return res.data;
  }


  return {};
}


//修改路由 可以根据后台或者权限动态设置路由  启动应用执行一次
export function patchRoutes({ routes }:any) {
  console.log('我可以调整路由');
  // routes.unshift({
  //   path: '/foo',
  //   exact: true,
  //   component: require('@/extraRoutes/foo').default,
  // });
}

//在初始加载和路由切换时做一些事情。每次切换都会执行
export function onRouteChange({ routes, matchedRoutes, location, action }:any) {

  //测试发现 umijs 约定式404 无法主动触发、所以自定义写了一个 配出文档查看路由
  if (routes.length && location.pathname.indexOf('~docs') === -1) {
    let routeStr = JSON.stringify(routesConfig);
    let has = routeStr.indexOf(`"path":"${location.pathname}"`);
    if(has === -1){
      history.push('/404');
      return;
    }
  }
  //如果是正式无法 手机登陆
  if(process.env.NODE_ENV === 'pro' && location.pathname === '/signInM'){
    history.push('/signIn');
    return;
  }

  //设置页面标题
  // if (matchedRoutes.length) {
  //    let title  = matchedRoutes[matchedRoutes.length - 1].route.title || false;
  //    if(title){
  //      document.title  = title;
  //    }
  // }
  console.log('我是路由钩子');
}

/**
 * Layout 插件允许通过运行时的配置退出登陆、自定义 ErrorBoundary 等功能。
 * https://procomponents.ant.design/components/layout/#prolayout
 */
export const layout = {
  //用于运行时配置默认 Layout 的 UI 中，点击退出登录的处理逻辑，默认不做处理。
  logout: () => {
    setTimeout(()=>{
      //请求服务退出登录 目前没有
      history.push('/signIn');
    },0);
  },
  //菜单显示模式
  // layout:'top',
  // fixedHeader:true,
  // fixSiderbar:true,
  //发生错误后的回调（可做一些错误日志上报，打点等）。
  onError:(err:any)=> {console.log(err);},
  onPageChange:(location:any)=>{
    // console.log("页面跳转了");
  },
  footerRender:(BasicLayoutProps:any)=>{
    return React.createElement(DefaultFooter,{
      copyright:"xxxxxxxx",
      links:[
        {
          key: 'Ant Design Pro',
          title: 'Ant Design Pro',
          href: 'https://pro.ant.design',
          blankTarget: true,
        }
      ]
    });
  },
  //可以这样渲染 内容部分公用部分
  childrenRender:(children:any)=>{
    if(
      history.location.pathname !== '/signInM'
      && history.location.pathname !== '/signIn'
      && history.location.pathname !== '/404'
      && history.location.pathname.indexOf('~docs') === -1
    ){
      return React.createElement(PageContainer,null,children);
    }
    return children;
  }
};


export const dva = {
  config: {
    onAction: createLogger(),
    onError(e: any) {
      message.error(e.message, 3);
    },
  },
};


//公用请求拦截器
export const request = requestConfig;
