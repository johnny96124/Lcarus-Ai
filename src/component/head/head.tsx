import React, { useState } from 'react';
import { Input, message, Popover } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { LanChance } from '../../page/home/component/languageChance';
import { Consumer } from '../../index';
const json = require('./lan.json');
import { Link } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import {API} from '../../fetch/fetch'


function HeadRight() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const onPressEnter = (value) => {
    message.info('该功能完善中');
    setIsModalVisible(false);
  };
  return (
    <Consumer>
      {(value) => (
        <div className="headRight">
          <Link to="" className="homeLink">
            {json[value.lan].link0}
          </Link>
          <Link to="/gallery">{json[value.lan].link1}</Link>
          <Link to="">{json[value.lan].link2}</Link>
          <Link to="">{json[value.lan].link3}</Link>
          <LanChance></LanChance>
          <SearchOutlined onClick={showModal}></SearchOutlined>
          <div className={`head-search ${isModalVisible && 'show'}`}>
            <Input
              onBlur={() => {
                setIsModalVisible(false);
              }}
              onPressEnter={onPressEnter}
            />
          </div>
        </div>
      )}
    </Consumer>
  );
}

declare const window: any;
// 头像和hover显示的dom
export class GetUserInfoDom extends React.Component {
  constructor(props:any) {
    super(props)
    this.state = {
      userInfo: {}
    }
  }
  state: {
    userInfo: any
  }
  componentDidMount(){
    const _this = this
    API.getuserInfo(window.ctxWeb3.eth.defaultAccount)
    .then(res => {
      _this.setState({
        userInfo: {
          img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2070453827,1163403148&fm=26&gp=0.jpg',
          // name: '测试人员'
        }
      })
    })
    .catch(res => {
      _this.setState({
        userInfo: {
          img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2070453827,1163403148&fm=26&gp=0.jpg',
          // name: '测试人员'
        }
      })
    })
  }
  render(){
    const content = (
      <Consumer>
        {value => (
          <div className='userPop'>
            <Link to={`/userEdit`}>{json[value.lan].edit}</Link>
            <Link to={`/user/${window.ctxWeb3.eth.defaultAccount}`}>{json[value.lan].personal}</Link>
            <Link to={`/createArt`}>{json[value.lan].creat}</Link>
            <Link to={`/generateLayer`}>{json[value.lan].generate}</Link>
          </div>
        )}
      </Consumer>
    )
    return (
      <Consumer>
      {value => (
        <Popover  placement="bottomRight"
        title={`Hello ${this.state.userInfo.name || window.ctxWeb3.eth.defaultAccount.substring(0, 6) + '...'}`}
        content={content}>
          <img src={this.state.userInfo.img} alt=""/>              
        </Popover>
      )}
      </Consumer>
    )
  }
} 

// 头部
export class HEADC extends React.Component {
  constructor(props: object) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
  }
  onSearch(value: object) {
    console.log(value);
  }
  
  render() {
  const userImg = (
    <GetUserInfoDom/>
    // <Consumer>
    //   {value => (
    //     value.hasLoginWallet
    //     ?
    //     <GetUserInfoDom/>
    //     : 
    //     <div className='userImg'>{json[value.lan].nologged}</div>
    //   )}
    // </Consumer>
    
  )
    return (
      <Consumer>
        {
          (value) =>(
            <div id="head">
              <div className="head-content">
                <div className="head-logo">
                  <UserOutlined></UserOutlined>
                </div>
                <HeadRight></HeadRight>
              </div>
              <div className='userImg'>
                {userImg}
              </div>
            </div>
        )}
      </Consumer>
    );
  }
}
