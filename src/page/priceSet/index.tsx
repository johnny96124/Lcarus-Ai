import React, { useState } from 'react';
import { Input, Select, message, DatePicker, Button, Tabs, Steps,Collapse, InputNumber } from 'antd';
const { TabPane } = Tabs;

const { Option } = Select;
const { Step } = Steps;
const { Panel } = Collapse;
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
const json = require('./lan.json');
import { Consumer } from '../../index';
import { Link } from 'react-router-dom';
import {API, uploadAvatar, walletSign} from '../../fetch/fetch'
import './priceSet.less'
declare const window: any;



export  class priceSet extends React.Component {
  constructor(props:any) {
    super(props)
    this.state = {
      current: 0,
      data: [
        {
          type: '主画布',
          name: '画布名称',
          priceType: '1',
          price: 200,
        },
        {
          type: '图层',
          name: '图层1',
          list: [
            {
              url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2996362738,3645200056&fm=26&gp=0.jpg'
            }
          ],
          price: 200,
          priceType: '2',
          startTime: '',
          day: 5,
          floorPrice: 200,
          fixdPrice: 400
        },
        {
          type: '图层',
          name: '图层2',
          priceType: '3',
          list: [
            {
              url:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3129594323,301998782&fm=26&gp=0.jpg'
            }
          ]
        },
      ]
    }
  }
  state: {
    current: number,
    data: any
  }
  render() {
    const genExtra = (item) => (
      <Consumer>  
        {
          value => (
              <span>
                {json[value.lan]['type' + item.priceType]}
                &nbsp;{item.price}
              </span>
          )
        }
      </Consumer>
    );
    return (
      <Consumer>
        {
          value => (
            <div id='priceSet'>
              <div className='contentBox'>
                <h1>
                  {json[value.lan].price}
                </h1>
                <Collapse accordion>
                  {
                    this.state.data.map((item, index) => (
                      <Panel key={index}  header={`${item.type}-${item.name}`}  extra={genExtra(item)}>
                        <div className='imgList'>
                          {
                            item.list && item.list.map(todo => (
                              <img key={todo.url} src={todo.url} alt=""/>
                            ))
                          }
                          <div className='clear'></div>
                        </div>
                        <Tabs defaultActiveKey={item.priceType}>
                          <TabPane tab={json[value.lan].type1} key="1">
                            <InputNumber min={0} value={item.price} onChange={v => {
                              const data = item
                              data.price = v
                              this.state.data[index] = data

                              this.setState({data: [...this.state.data]})
                            }}></InputNumber>
                            <Button className='ok'>{json[value.lan].ok}</Button>
                          </TabPane>
                          <TabPane tab={json[value.lan].type2} key="2">
                            <h3>{json[value.lan].price1}</h3>
                            <InputNumber min={0} value={item.price} onChange={v => {
                              const data = item
                              data.price = v
                              this.state.data[index] = data

                              this.setState({data: [...this.state.data]})
                            }}>
                            </InputNumber>
                            <h3>{json[value.lan].time1}</h3>
                            <DatePicker></DatePicker>
                            <h3>{json[value.lan].time2}</h3>
                            <Select defaultValue="1" style={{ width: 300 }} >
                              <Option value="1">1{json[value.lan].day}</Option>
                              <Option value="3">3{json[value.lan].day}</Option>
                              <Option value="5">5{json[value.lan].day}</Option>
                              <Option value="7">7{json[value.lan].day}</Option>
                            </Select>
                            <h3>{json[value.lan].price2}</h3>
                            <InputNumber min={0}></InputNumber>
                            <h3>{json[value.lan].type1}</h3>
                            <InputNumber min={0}></InputNumber>
                            <Button className='ok'>{json[value.lan].ok}</Button>
                          </TabPane>
                          <TabPane tab={json[value.lan].type3} key="3">
                            {json[value.lan].dis}
                            <Button className='ok'>{json[value.lan].ok}</Button>
                          </TabPane>
                        </Tabs>
                      </Panel>
                    ))
                  }
                  
                </Collapse>
              </div>
            </div>
          )
        }
      </Consumer>
    )
  }
}