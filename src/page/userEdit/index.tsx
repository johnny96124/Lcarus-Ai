import React, { useState } from 'react';
import { Input, Upload, message, Form, Button, Checkbox } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
const json = require('./lan.json');
import { Consumer } from '../../index';
import {API, uploadAvatar, walletSign} from '../../fetch/fetch'
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
      imgurl: '',
      name: '',
      email: '',
      address: '',
      webUrl: '',
      introduce: '',
      loading: false,
    }
  }
  state: {
    imgurl: string,
    name: string,
    email: string,
    address: string,
    webUrl: string,
    introduce: string,
    loading: boolean
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
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };
  componentDidMount(){
    API.getuserInfo(window.ctxWeb3.eth.defaultAccount).then(res => {
      this.setState ( {
        imgurl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2070453827,1163403148&fm=26&gp=0.jpg',
        name: '测试人员',
        email: '123',
        address: '123',
        webUrl: '213',
        introduce: '123'
      } )
    })
  }
  render() {
    const onFinish = (values: any) => {
      for (let key in values) {
        if (values[key] === undefined) values[key] = ''
      }
      const data = {ts: new Date().getTime(), ...values}
      console.log(data)
      walletSign("0x0b18c352e7fe19efea86a7e545fce0d30951af6b", data)
      .then(res => {
        API.postuserInfo(data,"0x0b18c352e7fe19efea86a7e545fce0d30951af6b", res.signature)
        .then(res => {
          console.log(res)
        })
      })
      .catch(res => {
        message.error(res)
      })
      
    }
    const { loading, imgurl } = this.state;
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
                <Form
                  labelCol= { {'span': 6} }
                  wrapperCol= {{ 'span': 22 }}
                  name="basic"
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
                    label={json[value.lan].address}
                    name="address"
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
              </div>
            </div>
          )
        }
      </Consumer>
    )
  }
}