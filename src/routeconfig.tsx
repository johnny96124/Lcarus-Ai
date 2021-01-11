import { Home } from './page/home/index';
import { User } from './page/user/index';
import { Gallery } from './page/gallery/index';
import React, { useState } from 'react';
import { message } from 'antd';


declare const window: any;
const hasCortexw = window.ctxWeb3 && window.ctxWeb3.eth.defaultAccount

function noPerDom () {
  const lan = window.localStorage.language
  const lans = {
    zn: '用户未下载钱包或者没有登录，请登录钱包后刷新页面',
    en: 'The user is not downloading the wallet or logging in，Please login and refresh the page',
    hn: '사용자가 지갑을 다운로드하지 않았거나 로그인하지 않았습니다. 로그인 후 새로고침'
  }
  message.error(lans[lan], 10)
  return <div style={ { 
    color: 'red',
    fontSize: '40px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  } }>download: <a style={{fontSize: '24px'}} href="https://www.cortexlabs.ai/wallet" target='_blank'> cortex wallet</a></div>
}


// 不需要登录钱包能进的页面
export const whiteRoutes = [
  {
    name: '首页',
    path: '/',
    component: Home
  },
  {
    name: '艺术家主页',
    path: '/user/:userid',
    component: User
  },
  {
    name: '画廊',
    path: '/gallery',
    component: Gallery
  }
]

// 需要登录钱包
export const perRoutes = [
  // {
  //   name: 'aaa',
  //   path: '/aaa',
  //   component: hasCortexw ?  <div></div> :noPerDom
  // }
]