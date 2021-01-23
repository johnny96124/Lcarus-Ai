import React, { useState } from 'react';
import {  Button, Menu, Dropdown, Pagination, Spin, Table } from 'antd';
import { Consumer } from '../../index';
import { EditOutlined, DownOutlined, HeartOutlined } from '@ant-design/icons';
const json = require('../gallery/lan.json')
const json2 = require('./lan.json');

// 合并语言包
for (let key in json) {
  json[key] = {...json[key], ...json2[key]}
}

import { Link } from 'react-router-dom';


function getday(s:number) {
  const day = Math.floor(s / (1000 * 60 * 60 * 24))
  return day > 9 ? day : '0' + day
}
function geth(s:number) {
  const day = Math.floor(s / (1000 * 60 * 60))
  return day > 9 ? day : '0' + day
}
function getm(s:number) {
  const day = Math.floor(s / (1000 * 60))
  return day > 9 ? day : '0' + day
}
function gets(s:number) {
  const day = Math.floor(s / 1000)
  return day > 9 ? day : '0' + day
}

export class ListTypeshow extends React.Component {
  constructor(props: object) {
    super(props);
    this.getUserinfo2 = this.getUserinfo2.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      auction: 0, // 0:全部，1拍卖中，2即将拍卖，3：售卖（一口价的物品， 4：不卖的物品
      imgType: 0, // 0: 全部， 1主画布， 2图层
      collation: 0, // 搜索结果排序规则
      list: [],
      total: 1,
      sort: '',
      loading: false
    }
  }
  props: {
    address: string
  }
  componentDidMount(){
    this.getUserinfo2(1)
  }
  state: {
    auction: number,
    imgType: number,
    collation: number, // 搜索结果排序规则
    list: Array<any>,
    total: number,
    sort:string,
    loading: boolean
  }
  onChange (pageNumber) {
    this.getUserinfo2(pageNumber)
  }
  // 画廊列表
  getUserinfo2(pagenum: number) {
    this.setState({loading: true})
    const searchData = { 
      auction: this.state.auction,
      collation: this.state.collation,
      pages: 12,
      pagenum: pagenum 
    }
    const res = [1,2,3,4,5,6,7,8,9,10,11,12].map(item => {
      return {
        img:
          'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1896238784,1495930168&fm=26&gp=0.jpg',
        name: '名称',
        collection: false,
        look: '125',
        parice: '0.6ETH',
        token: Math.ceil(Math.random() * 10000 ),
        hasAddress: '0x1212121212121212121212',
        artistAddress: '0x1313131313131313131313',
        countdown: 126400000,
        auction: Math.ceil(Math.random() * 4),
        priceType: '1'
      }
    })
    setTimeout(() => {
      this.setState(
        {
          list: res,
          total: 12,
          loading: false
        }
      )
    }, 1000)
    
  }
  render() {
    const sortClick = (key) => {
      this.setState({sort:key.key})
      this.getUserinfo2(1)
    }
    const menu = (
      <Consumer>
        {
          value => (
            <Menu onClick = {sortClick}>
              {
                ['timeup', 'timedown', 'priceup', 'pricedown'].map(item => (
                  <Menu.Item key={item}>{json[value.lan][item]}</Menu.Item>
                ))
              }\
            </Menu>
          )
        }
      </Consumer>
      
    )
    return (
      <Consumer>
        {(value) => (
          <div className='box'>
            <div className='search'>
              <div className='searchButton'>
                <div className='left'>
                  <Button className= {this.state.auction === 1 ? 'is' : ''} onClick={() => {
                    this.setState({auction: 1}); this.getUserinfo2(1)
                  }}>{json[value.lan].auction1}</Button>
                  <Button className= {this.state.auction === 2 ? 'is' : ''} onClick={() => {
                    this.setState({auction: 2}); this.getUserinfo2(1)
                  }}>{json[value.lan].auction2}</Button>
                  <Button className= {this.state.auction === 3 ? 'is' : ''} onClick={() => {
                    this.setState({auction: 3}); this.getUserinfo2(1)
                  }}>{json[value.lan].auction3}</Button>
                  <Button className= {this.state.auction === 4 ? 'is' : ''} onClick={() => {
                    this.setState({auction: 4}); this.getUserinfo2(1)
                  }}>{json[value.lan].auction4}</Button>
                </div>
                <div className='center'>
                  <Button className= {this.state.imgType === 1 ? 'is' : ''} onClick={() => {
                    this.setState({imgType: 1}); this.getUserinfo2(1)
                  }}>{json[value.lan].imgType1}</Button>
                  <Button className= {this.state.imgType === 2 ? 'is' : ''} onClick={() => {
                    this.setState({imgType: 2}); this.getUserinfo2(1)
                  }}>{json[value.lan].imgType2}</Button>
                </div>
                <div className='right'>
                  <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link">
                      { this.state.sort ?  json[value.lan][this.state.sort] : json[value.lan].sorting}<DownOutlined />
                    </a>
                  </Dropdown>
                </div>
              </div>
            </div>
            <Spin spinning={this.state.loading}>
              <div className="pagBox">
                {
                  this.state.list.map((item,index) => (
                    <div className={`list auction${item.auction}`} key = {index}>

                      <Link to={`/auction/${item.token}`}>
                        <img src={item.img} alt=""  />
                      </Link>
                      <span className={`type ${value.lan}`}>{json[value.lan].show[item.auction - 1]}</span>
                      <h3>
                        <span className="name">{item.name}</span>
                        <span>
                          <span className="pricename">{json[value.lan][`price${item.priceType}`]}</span>
                          <span className="price">{item.parice}</span>
                        </span>
                      </h3>
                      <h3 className='hasor'>
                        <span>
                          <Link to={`/user/${item.artistAddress}`}>
                            <img src={item.img} alt=""/>
                            {json[value.lan].artist}
                          </Link>
                          <Link to={`/user/${item.hasAddress}`}>
                            <img src={item.img} alt=""/>
                            {json[value.lan].holders}
                          </Link>
                        </span>
                        <HeartOutlined
                          title={json[value.lan].collection}
                          style={{ color: item.collection ? 'green' : 'red' }}
                        />
                      </h3>
                      {
                        (item.auction === 1 || item.auction === 2) &&
                        <p style = {{backgroundColor: ['#57b27a', '#eb973f'][item.auction - 1]}}>
                          {json[value.lan].countdown}:  &nbsp;
                          {getday(item.countdown)}  
                          {json[value.lan].day}  &nbsp;
                          {geth(item.countdown % (1000 * 60 * 60 * 24))}  
                          {json[value.lan].hour}  &nbsp;
                          {getm(item.countdown % (1000 * 60 * 60))}  
                          {json[value.lan].minutes}  &nbsp;
                          {gets(item.countdown % (1000 * 60))}  
                          {json[value.lan].seconds}
                      </p>
                      }
                      
                    </div>
                  ))
                }
              </div>
            </Spin>

            <Pagination simple defaultPageSize={12} defaultCurrent={1} total={this.state.total} onChange={this.onChange} />
          </div>
            
        )}
      </Consumer>
    );
    
  }
}

export  function TradingList (props) {
  console.log(props)
  const list = [
    {
      name: '事件',
      price: '1213CTXC',
      from: '55.36CTXC',
      to: '55.36CTXC',
      time: '2020-1-1',
      tx: '123',
      key: ''
    }
  ]
  list[0].key = '0';
  for (let i = 1; i < 8; i++) {
    list[i] = { ...list[0] };
    list[i].key = i + '';
  }
  
  return (
    <Consumer>
      {
        value => {
        const columns = [
          {
            title: json[value.lan].recordName,
            ellipsis: true,
            dataIndex: 'name'
          },
          {
            title: json[value.lan].price,
            ellipsis: true,
            dataIndex: 'price'
          },
          {
            title: 'From',
            ellipsis: true,
            dataIndex: 'from'
          },
          {
            title: 'To',
            ellipsis: true,
            dataIndex: 'to'
          },
          {
            title: json[value.lan].time,
            ellipsis: true,
            dataIndex: 'time'
          },
          {
            title: 'Tx',
            ellipsis: true,
            dataIndex: 'tx'
          }
        ];
        return <Table dataSource={list} columns={columns} />;
      }}
    </Consumer>
  );
}