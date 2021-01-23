import React, { useState } from 'react';
import { Input, Upload, message, Form, Button, Checkbox } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
const json = require('./lan.json');
import { Consumer } from '../../index';
import {API, uploadAvatar, walletSign, getRecoverid} from '../../fetch/fetch'
import './userEdit.less'
declare const window: any;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG/GIF file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}



export  class userEdit extends React.Component {
  constructor(props:any) {
    super(props)
    this.state = {
      loading: false,
      loadingForm: false,
      userInfor: {
        imgurl: '',
        name: '',
        email: '',
        area: '',
        webUrl: '',
        introduce: '',
      }
      
    }
  }
  state: {
    loading: boolean,
    loadingForm: boolean,
    userInfor: {
      imgurl: string,
      name: string,
      email: string,
      area: string,
      webUrl: string,
      introduce: string,
    }
    
  }
  handleChange = info => {
    console.log(info)
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        {
          this.setState({ loading: false })
          this.setState({
            userInfor: {
            ...this.state.userInfor,
            imageUrl:imageUrl
            }
          })
        }
      );
    }
  };
  componentDidMount(){
    API.getuserInfo(window.ctxWeb3.eth.defaultAccount).then(res => {
      this.setState ( {userInfor: res})
      this.setState ( {loadingForm: true})
    })
  }
  render() {
    const onFinish = (values: any) => {
      for (let key in values) {
        if (values[key] === undefined) values[key] = ''
      }
      const data = JSON.stringify({ts: Math.ceil(new Date().getTime() / 1000), ...values})
      walletSign(window.ctxWeb3.eth.defaultAccount, data)
      .then(res => {
        API.postuserInfo(data, window.ctxWeb3.eth.defaultAccount, res.signature)
        .then(resData => {
          if (resData == 'OK') {
            message.success('success')
          } else {
            message.error('error')
          }
        })
        // getRecoverid(res.signature, data).then(res2 => {
        // })
      })
      .catch(res => {
        message.error(res)
      })
      
    }
    const {  imgurl } = this.state.userInfor;
    const { loading } = this.state
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <Consumer>
        {
          value => (
            <div id='userEdit'>
              <div className='userEditContent'>
                <h1>{json[value.lan].edit}</h1>
                <div className='avatar'>
                  <Upload
                    name="avatar"
                    accept= ".gif,.png,.jpeg,.jpg"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    // action={(file) =>uploadAvatar(file)}
                    action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                  >
                    {imgurl ? <img src={imgurl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    <p className='disT'>{json[value.lan].dis1}</p>
                  </Upload>
                </div>
                {
                  this.state.loadingForm &&
                  <Form
                  labelCol= { {'span': 6} }
                  wrapperCol= {{ 'span': 22 }}
                  name="basic"
                  initialValues={this.state.userInfor}
                  onFinish={onFinish}
                  // onFinishFailed={onFinishFailed}
                  >
                    <Form.Item
                      label={json[value.lan].name}
                      name="name"
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label={json[value.lan].email}
                      name="email"
                      rules={[{
                        type: 'email',
                        message: json[value.lan].emailM,
                      }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={json[value.lan].area}
                      name="area"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={json[value.lan].webUrl}
                      name="webUrl"
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label={json[value.lan].introduce}
                      name="introduce"
                    >
                      <Input.TextArea rows={4}/>
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        {json[value.lan].save}
                      </Button>
                    </Form.Item>
                  </Form>
                }
              </div>
            </div>
          )
        }
      </Consumer>
    )
  }
}