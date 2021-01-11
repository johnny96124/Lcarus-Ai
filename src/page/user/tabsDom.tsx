import React, { useState } from 'react';
import { Consumer } from '../../index';
import { Table, List, Avatar, Button } from 'antd';
import { Link } from 'react-router-dom';
import { UpOutlined, EyeOutlined, HeartOutlined } from '@ant-design/icons';
const json = require('./lan.json');

const domlist = {
  1: function (list) {
    for (let i = 1; i < 8; i++) {
      list[i] = list[0];
    }
    return (
      <Consumer>
        {
          value => (
            <div className="listbox">
            {
              list.map( (item, index) => (
                <div className="list list2"  key = {index}>
                  <img src={item.img} alt="" />
                  <h3>
                    <span className="name">{item.name}</span>
                    <span>
                      <HeartOutlined
                      title={json[value.lan].collection}
                      style={{ color: item.collection ? 'green' : 'red' }}
                    />
                      <EyeOutlined title={json[value.lan].list6} /> {item.look}
                    </span>
                  </h3>
                  <h3>
                    <span className="pricename">{json[value.lan].price}</span>
                    <span className="price">{item.parice}</span>
                  </h3>
                </div>
              ))
            }</div>
        )}
      </Consumer>
    );
  },
  2: function (list) {
    for (let i = 1; i < 8; i++) {
      list[i] = list[0];
    }
    return (
      <Consumer>
        {
          value => (
            <div className="listbox">
            {
              list.map( (item, index) => (
                <div className="list list2"  key = {index}>
                  <img src={item.img} alt="" />
                  <h3>
                    <span className="name">{item.name}</span>
                    <span>
                      <HeartOutlined
                      title={json[value.lan].collection}
                      style={{ color: item.collection ? 'green' : 'red' }}
                    />
                      <EyeOutlined title={json[value.lan].list6} /> {item.look}
                    </span>
                  </h3>
                  <h3>
                    <span className="pricename">{json[value.lan].price}</span>
                    <span className="price">{item.parice}</span>
                  </h3>
                </div>
              ))
            }</div>
        )}
      </Consumer>
    );
  },
  3: function (list) {
    for (let i = 1; i < 8; i++) {
      list[i] = list[0];
    }
    return (
      <Consumer>
        {
          value => (
            <div className="listbox">
            {
              list.map( (item, index) => (
                <div className="list list3"  key = {index}>
                  <img src={item.img} alt="" />
                  <h3>
                    <span className="name">{item.name}</span>
                    <span>
                      <HeartOutlined
                      title={json[value.lan].collection}
                      style={{ color: item.collection ? 'green' : 'red' }}
                    />
                      <EyeOutlined title={json[value.lan].list6} /> {item.look}
                    </span>
                  </h3>
                  <h3>
                    <span className="pricename">{json[value.lan].price}</span>
                    <span className="price">{item.parice}</span>
                  </h3>
                </div>
              ))
            }</div>
        )}
      </Consumer>
    );
  },
  4: function (list) {
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
          console.log(list);
          return <Table dataSource={list} columns={columns} />;
        }}
      </Consumer>
    );
  },
  5: function (list) {
    for (let i = 1; i < 8; i++) {
      list[i] = list[0];
    }
    return (
      <Consumer>
        {
          value => (
            <div className="listbox">
            {
              list.map( (item, index) => (
                <div className="list list5"  key = {index}>
                  <img src={item.img} alt="" />
                  <h3>
                    <span className="name">{item.name}</span>
                    <span>
                      <HeartOutlined
                      title={json[value.lan].collection}
                      style={{ color: item.collection ? 'green' : 'red' }}
                    />
                      <EyeOutlined title={json[value.lan].list6} /> {item.look}
                    </span>
                  </h3>
                  <h3>
                    <span className="pricename">{json[value.lan].price}</span>
                    <span className="price">{item.parice}</span>
                  </h3>
                </div>
              ))
            }</div>
        )}
      </Consumer>
    );
  },
  6: function (list) {
    for (let i = 1; i < 8; i++) {
      list[i] = list[0];
    }
    return (
      <Consumer>
        {
          value =>(
            <div className="userlist">
            <h3>{json[value.lan].list6} 105</h3>
            <div className="listbox2">
              {
                list.map((item, index) => (
                  <div className="user" key={index}>
                    <img src={item.img} alt="" />
                    <p>
                      <span>
                        {item.fans} {json[value.lan].list7}
                      </span>
                      <span>{item.name}</span>
                    </p>
                    <Button className={item.isfan ? 'is' : ''}>
                      {item.isfan ? json[value.lan].list6 : json[value.lan].list6}{' '}
                      {}
                    </Button>
                  </div>
                ))
              }
            </div>

            <div className="more">
              <Button>{json[value.lan].more}</Button>
            </div>
            <p style={{ clear: 'both' }}></p>
          </div>
        )}
      </Consumer>
    );
  },
  7: function (list) {
    for (let i = 1; i < 8; i++) {
      list[i] = list[0];
    }
    return (
      <Consumer>
        {
          value => (
            <div className="userlist">
            <h3>{json[value.lan].list6} 105</h3>
            <div className="listbox2">
              {
                list.map((item, index) => (
                  <div className="user" key={index}>
                    <img src={item.img} alt="" />
                    <p>
                      <span>
                        {item.fans} {json[value.lan].list7}
                    </span>
                      <span>{item.name}</span>
                    </p>
                    <Button className={item.isfan ? 'is' : ''}>
                      {item.isfan ? json[value.lan].list6 : json[value.lan].list6}{' '}
                      {}
                    </Button>
                  </div>
                ))
              }
            </div>

            <div className="more">
              <Button>{json[value.lan].more}</Button>
            </div>
            <p style={{ clear: 'both' }}></p>
          </div>
        )}
      </Consumer>
    );
  }
};

export class RenderDom extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return <div>{domlist[this.props.n](this.props.list)}</div>;
  }
}
