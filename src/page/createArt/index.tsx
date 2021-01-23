import React, { useState } from 'react';
import { Input, Upload, message, Form, Button, Popconfirm, Steps,Collapse, InputNumber } from 'antd';
const { Step } = Steps;
const { Panel } = Collapse;
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
const json = require('./lan.json');
import { Consumer } from '../../index';
import { Link } from 'react-router-dom';
import {API, uploadAvatar, walletSign} from '../../fetch/fetch'
import './createArt.less'
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



export  class createArt extends React.Component {
  constructor(props:any) {
    super(props)
    this.state = {
      current: 0,
      uploadData: {
        canvasName: '',
        // 画布有多个图层
        layers: [ 
          {
            name: '',
            introduce: '',
            showIndex: 0, 
            // 每个图层有多个状态
            list: [{
              uid: '-1',
              name: 'xxx.png',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              size: 10000,
              type: 'png',
            }]
          } 
        ],
        width: 0,
        height: 0,
        isComplete: false
      }
    }
  }
  state: {
    current: number,
    uploadData:{
      canvasName: string,
      layers: Array<{
        name: string,
        introduce: string,
        list: any,
        showIndex: number
      }>,
      width: any,
      height: any,
      isComplete: boolean
    }
  }
  componentDidMount(){
    if (window.localStorage.uploadData){
      this.setState({uploadData: JSON.parse(window.localStorage.uploadData)})
    }
    // if (window.localStorage.stepCurrent){
    //   this.setState({current: window.localStorage.stepCurrent})
    // }
    window.onbeforeunload=function(e){
      var e = window.event||e;  
      e.returnValue=(json[window.localStorage.language].error7);
    } 
  }
  componentWillUnmount(){
    // 如果没有完成就退出，存在本地
    if (!this.state.uploadData.isComplete) {
      window.localStorage.uploadData = JSON.stringify(this.state.uploadData)
      // window.localStorage.stepCurrent = this.state.current
    }
    window.onbeforeunload = null
  }
  handleChange = (info, item) => {
    console.log(info)
    // if (info.file.status === 'uploading') {
    //   this.setState({ loading: true });
    //   return;
    // }
    if (info.file.status === 'removed') {
      item.list = item.list.filter(todo => todo.name !== info.file.name)
    }
    // if (info.file.status === 'error') {
    //   item.list = item.list.filter(todo => todo.name !== info.file.name)
    // }
    if (info.file.status === 'done' || info.file.status === 'error') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>{
        info.fileList.forEach((todo, index) => {
          item.list[index] = item.list[index] || {}
          item.list[index].url = todo.thumbUrl
          item.list[index].name = todo.name.split('.')[0]
        })
      });
      console.log(this.state.uploadData.layers[0].list)
      this.setState({uploadData: {...this.state.uploadData}})
    }
  };
  render() {
    const next = (lan) => {
      const uploadData = this.state.uploadData
      if (this.state.current === 0) {
        if (!uploadData.canvasName) {
          message.error(json[lan].error1)
          return
        }
        if (!uploadData.width || !uploadData.height ) {
          message.error(json[lan].error2)
          return
        }
        if (uploadData.layers.length === 0 ) {
          message.error(json[lan].error3)
          return
        }
        if (uploadData.layers.find(item => !item.name)) {
          message.error(json[lan].error5)
          return
        }
        if (
          uploadData.layers.find(item => item.list.length === 0)
        ) {
          message.error(json[lan].error4)
          return
        }
      }
      console.log(uploadData)
      this.setState({current: this.state.current + 1})
    };
    const prev = (lan) => {
      this.setState({current: this.state.current - 1})
    };
    const genExtra = (index) => (
      <Consumer>  
        {
          value => (

            <DeleteOutlined 
            onClick={event => {
              event.stopPropagation()
              if(confirm(json[value.lan].confirm)) {
                const data = {
                  canvasName : this.state.uploadData.canvasName,
                  layers: this.state.uploadData.layers.filter((todo, I) => I != index)
                }
                this.setState({uploadData: data})
              }
            }}/>
          )
        }
      </Consumer>
     
      
    );
    return (
      <Consumer>
        {
          value => (
            <div id='createArt'>
              <div className='contentBox'>
                <h1>
                  {json[value.lan].upload}
                </h1>
                <div className="steps">
                  <Steps current={this.state.current}>
                    <Step title={json[value.lan].step1}/>
                    <Step title={json[value.lan].step2}/>
                    <Step title={json[value.lan].step3}/>
                  </Steps>
                </div>
                <div className="stepContent">
                  {
                    this.state.current === 0 && (
                      // step1 上传
                      <div className='step1Content'>
                        <h2>
                          <span >{json[value.lan].canvas}{json[value.lan].name}</span>
                          <Input value={this.state.uploadData.canvasName} onChange={(e) => {
                            this.setState({uploadData: {...this.state.uploadData, canvasName: e.target.value}})
                          }}></Input>
                        </h2>
                        <h2>
                          <span >{json[value.lan].canvas}{json[value.lan].size}</span>
                          <InputNumber value={this.state.uploadData.width}  min={0} max={2160}  onChange={(e) => {
                            this.setState({uploadData: {...this.state.uploadData, width: e}})
                          }}></InputNumber>
                          &nbsp;&nbsp;X&nbsp;&nbsp;
                          <InputNumber value={this.state.uploadData.height}  min={0} max={2160} onChange={(e) => {
                            this.setState({uploadData: {...this.state.uploadData, height: e}})
                          }}></InputNumber>
                        </h2>
                        <Button className='add' onClick={() => {
                          const data = {
                            ...this.state.uploadData,
                            layers: this.state.uploadData.layers.concat({
                              name: '',
                              introduce: '',
                              list: [],
                              showIndex: 0
                            }),
                          }
                          this.setState({uploadData: data})
                        }}>+</Button>
                        {/* {this.state.uploadData.layers.length === 0 && <p>暂无图层</p>} */}
                        <Collapse accordion>
                          {
                            this.state.uploadData.layers.map((item, index) => (
                              <Panel header={item.name || `${json[value.lan].layer}${index + 1}`} key={index} extra={genExtra(index)}>
                                <div className='layerBox'>
                                  <div className='layerLeft'>
                                    <span>
                                      {json[value.lan].layer + (index + 1)}
                                    </span>
                                  </div>
                                  <div className='layerRight'>
                                    <Input value={item.name} placeholder={`${json[value.lan].layer}${json[value.lan].name}`} onChange={(e) => {
                                      let data = this.state.uploadData
                                      data.layers[index].name = e.target.value
                                      this.setState({uploadData: data})
                                    }}></Input>
                                    <Input.TextArea value={item.introduce} placeholder={json[value.lan].dis}
                                    onChange={(e) => {
                                      let data = this.state.uploadData
                                      data.layers[index].introduce = e.target.value
                                      this.setState({uploadData: data})
                                    }} rows={4}></Input.TextArea>
                                    <Upload
                                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                      listType="picture"
                                      accept="png"
                                      defaultFileList={item.list}
                                      beforeUpload = {(file, fileList) => {
                                        return new Promise((resolve, reject) => {
                                          const isLt2M = file.size / 1024 / 1024 <=2//图片大小不超过2MB
                                          if (item.list.find(todo => todo.name === file.name.split('.')[0]) !== undefined) {
                                            message.error(json[value.lan].error6)
                                            return reject(false)
                                          }
                                          return resolve()
                                        });
                                      }}
                                      onChange={(v) => {this.handleChange(v, item)}}
                                    >
                                      <Button icon={<UploadOutlined />}>Upload</Button>
                                    </Upload>
                                  </div>
                                </div>
                              </Panel>
                            ))
                          }
                        </Collapse>
                      </div>
                    )
                  }
                  {
                    this.state.current === 1 && (
                      <div className='step2Content'>
                        <div className='canvasBox' style = {{
                          width: '400px',
                          height: 400 * (this.state.uploadData.height/this.state.uploadData.width) + 'px'
                        }}>
                          {
                            this.state.uploadData.layers.map(item => (
                              <img src={item.list[item.showIndex].url} key={item.name} alt=""/>
                            ))
                          }
                        </div>
                        <Collapse>
                          {
                            this.state.uploadData.layers.map((item, index) => (
                              <Panel header={item.name || `${json[value.lan].layer}${index + 1}`} key={index}>
                                <div className='imgList'>
                                  {
                                    item.list.map((todo, _index) => (
                                      <img className={_index === item.showIndex ?'is':''} src={todo.url} key={_index}  onClick={() => {
                                        item.showIndex = _index
                                        this.setState({uploadData: {...this.state.uploadData}})
                                      }}/>
                                    ))
                                  }
                                  <div className='clear'></div>
                                </div>
                              </Panel>
                            ))
                          }
                        </Collapse>
                      </div>
                    )
                  }
                  {
                    this.state.current === 2 && (
                      <div className='step2Content step3Content'>
                      <div className='canvasBox' style = {{
                        width: '400px',
                        height: 400 * (this.state.uploadData.height/this.state.uploadData.width) + 'px'
                      }}>
                        {
                          this.state.uploadData.layers.map(item => (
                            <img src={item.list[item.showIndex].url} key={item.name} alt=""/>
                          ))
                        }
                        <Button>{json[value.lan].step3}</Button>
                      </div>
                      <Collapse>
                        {
                          this.state.uploadData.layers.map((item, index) => (
                            <Panel header={item.name || `${json[value.lan].layer}${index + 1}`} key={index}>
                              <div className='imgList'>
                                {
                                  item.list.map((todo, _index) => (
                                    <img className={_index === item.showIndex ? 'is' : ''} src={todo.url} key={_index}  onClick={() => {
                                      item.showIndex = _index
                                      this.setState({uploadData: {...this.state.uploadData}})
                                    }}/>
                                  ))
                                }
                                <div className='clear'></div>
                              </div>
                              <div className='step3'>
                                <Button>{json[value.lan].step3}</Button>
                              </div>
                            </Panel>
                          ))
                        }
                      </Collapse>
                    </div>
                    )
                  }
                </div>
                <div className='nextButton'> 
                  <Button onClick={() => {prev(value.lan)}} disabled={this.state.current === 0}>
                    {json[value.lan].prev}
                  </Button>
                  {
                    this.state.current < 2 ? (
                      <Button onClick={() => {next(value.lan)}} >
                        {json[value.lan].next}
                      </Button>
                    ) : (
                      <Button>
                        <Link to='/priceSet'>{json[value.lan].step4}</Link>
                        
                      </Button>
                    )
                  }
                  
                </div>
              </div>
            </div>
          )
        }
      </Consumer>
    )
  }
}