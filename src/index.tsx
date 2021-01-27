import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { HEADC } from './component/head/head';
import {NoPerDom} from './routeconfig'
import './index.less';

declare const window: any;





import 'antd/dist/antd.css';

const obj = {
  lan: 'zn',
  ChangeLan: (value) => {
    obj.lan = value;
  },
  hasLoginWallet: false
};
export const { Provider, Consumer } = React.createContext(obj);



class APP extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      lan: localStorage.language || 'zn',
      ChangeLan: (value) => {
        // 切换语言过场动画
        document.querySelector('body').style.opacity = '0';
        setTimeout(() => {
          this.setState((state) => {
            window.localStorage.language = value;
            return { lan: value };
          });
        }, 1000);
        setTimeout(() => {
          document.querySelector('body').style.opacity = '1';
        }, 1500);
      },
      hasLoginWallet: true
    };
  }
  state: {
    lan: 'zn',
    ChangeLan: any,
    hasLoginWallet: boolean
  }
  componentDidMount(){
    const _this = this
    // 轮询检测钱包状态
    window.walletLogin = setInterval( () => {
      if (window.ctxWeb3 && window.ctxWeb3.eth.defaultAccount) {
        if(!_this.state.hasLoginWallet)  _this.setState({hasLoginWallet: true})
      } else {
        if (_this.state.hasLoginWallet) _this.setState({hasLoginWallet: false})
      }
    } , 500)
  }
  componentWillUnmount() {
    clearInterval(window.walletLogin)
  }
  render() {
    const {whiteRoutes, perRoutes} =  require('./routeconfig')
    return (
      <div id="app">
        <Provider value={this.state}>
          <Router>
            <HEADC></HEADC>
            <Switch>
              {
                whiteRoutes.map(item => (
                  <Route path={item.path} component={item.component} key={item.name} exact/>
                ))
              }
              {
                perRoutes.map(item => (
                  <Route path={item.path} component={this.state.hasLoginWallet ? item.component : NoPerDom} key={item.name} exact/>
                ))
              }
            </Switch>
          </Router>
        </Provider>
      </div>
    );
  }
}
// 确保在渲染页面时，ctxWeb3（钱包）已经初始化完毕
window.onload = () => {
  ReactDOM.render(<APP />, document.getElementById('root'));
}
