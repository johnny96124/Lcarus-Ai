import React from 'react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Consumer } from '../../../index';
const lans = require('@/utils/language.json');

export class LanChance extends React.Component {
  render() {
    const menu = (
      <Consumer>
        {(value) => (
          <Menu>
            {lans.map((item) => (
              <Menu.Item key={item.code}>
                <a
                  onClick={() => {
                    value.ChangeLan(item.code);
                  }}
                >
                  {item.name}
                </a>
              </Menu.Item>
            ))}
          </Menu>
        )}
      </Consumer>
    );
    return (
      <Consumer>
        {(value) => (
          <Dropdown overlay={menu}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              {lans.find((item) => item.code === value.lan).name}
              <DownOutlined />
            </a>
          </Dropdown>
        )}
      </Consumer>
    );
  }
}
