import React, { useState } from 'react';
import { Tabs, Button, Progress, message } from 'antd';
import {Link} from 'react-router-dom'
import { Consumer } from '../../index';
import { EditOutlined } from '@ant-design/icons';
const json = require('./lan.json');
import './user.less';
import { Content } from 'antd/lib/layout/layout';
const { TabPane } = Tabs;
import { RenderDom } from './tabsDom';
import { API } from '../../fetch/fetch.js';

declare const window: any;

// 下半部分列表内容
class Listshow extends React.Component {
  constructor(props: object) {
    super(props);
    this.getUserinfo2 = this.getUserinfo2.bind(this);
  }
  // 获取用户信息
  getUserinfo2(n: number) {
    switch (n) {
      case 1:
        return [
          {
            img:
              'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1896238784,1495930168&fm=26&gp=0.jpg',
            name: '名称',
            collection: false,
            look: '125',
            parice: '0.6ETH'
          }
        ];
        break;
      case 2:
        return [
          {
            img:
              'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1896238784,1495930168&fm=26&gp=0.jpg',
            name: '名称',
            collection: false,
            look: '125',
            parice: '0.6ETH'
          }
        ];
        break;
      case 3:
        return [
          {
            img:
              'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1896238784,1495930168&fm=26&gp=0.jpg',
            name: '名称',
            collection: false,
            look: '125',
            parice: '0.6ETH'
          }
        ];
        break;
      case 4:
        return [
          {
            name: '事件',
            price: '1213CTXC',
            from: '55.36CTXC',
            to: '55.36CTXC',
            time: '2020-1-1',
            tx: '123'
          }
        ];
        break;
      case 5:
        return [
          {
            img:
              'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1896238784,1495930168&fm=26&gp=0.jpg',
            name: '名称',
            collection: false,
            look: '125',
            parice: '0.6ETH'
          }
        ];
        break;
      case 6:
        return [
          {
            img:
              'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2070453827,1163403148&fm=26&gp=0.jpg',
            dis: {
              zn:
                '中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍',
              en:
                'english introduce english introduce english introduce english introduce english introduce',
              hn:
                '中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍'
            },
            name: '名称',
            fans: 23,
            isfan: false
          }
        ];
        break;
      case 7:
        return [
          {
            img:
              'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2070453827,1163403148&fm=26&gp=0.jpg',
            dis: {
              zn:
                '中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍',
              en:
                'english introduce english introduce english introduce english introduce english introduce',
              hn:
                '中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍'
            },
            name: '名称',
            fans: 23,
            isfan: false
          }
        ];
        break;
      default:
        break;
    }
  }
  render() {
    console.log('render');
    return (
      <Consumer>
        {(value) => (
            <div className="pagBox">
              <div className="pag">
                <Tabs defaultActiveKey="1">
                  {new Array(1, 2, 3, 4, 5, 6, 7).map((item) => (
                  <TabPane tab={json[value.lan][`list${item}`]} key={item}>
                        <RenderDom n={item} list={this.getUserinfo2(item)}></RenderDom>
                      </TabPane>
                    ))
                  }
                </Tabs>
              </div>
            </div>
        )}
      </Consumer>
    );
    
  }
}

// 上半部分用户信息
class Info extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      user: {
        img: '',
        name: '',
        address: '',
        dis: {}
      }
    };
  }
  props: {
    userid: string;
  };
  componentDidMount() {
    API.getuserInfo(this.props.userid).
    then(res => {
      this.setState((state) => {
        return {
          user: {
            img:
              'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2070453827,1163403148&fm=26&gp=0.jpg',
            name: '测试人员',
            address: this.props.userid,
            dis: {
              zn:
                '中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍',
              en:
                'english introduce english introduce english introduce english introduce english introduce',
              hn:
                '中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍中文介绍'
            }
          }
        };
      });
    })
    
  }
  state: {
    user: {
      img: '';
      name: '';
      address: '';
      dis: {};
    };
  };
  render() {
    let is =  false
    if (window.ctxWeb3 && window.ctxWeb3.eth.defaultAccount && window.ctxWeb3.eth.defaultAccount == this.state.user.address){
      is = true
    }
    return (
      <Consumer>
        {  value => 
            <div className="userinfoBox">
              <div className="userinfo">
                <div className= { is ? 'is imgbox' : 'imgbox'}>
                  <div className='shadowBox'></div>
                    <Link className='edit' to={`/userEdit${this.state.user.address}`}>{json[value.lan].edit}</Link>
                  <img src={this.state.user.img}  alt=""/>
                </div>
                <h3>{this.state.user.name}</h3>
                <p>{this.state.user.address}    
                  <EditOutlined  onClick = {() => {
                    const oInput = document.createElement('input');
                    oInput.value = this.state.user.address;
                    document.body.appendChild(oInput);
                    oInput.select();
                    const res = document.execCommand('copy');
                    document.body.removeChild(oInput);
                    res && message.success('操作成功');
                    !res && message.error('操作失败');
                  }} />
                </p>
              <div className='dis'>{this.state.user.dis[value.lan]}</div>
              <Button>{json[value.lan].attention}</Button>
              </div>
          </div>
        }
      </Consumer>
    );
  }
}

export function User(props: any) {
  return (
    <div id="User">
      <Info userid={props.match.params.userid}></Info>
      <Listshow></Listshow>
    </div>
  );
}
