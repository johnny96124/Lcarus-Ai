
// const Interface = 'http://share.cortexlabs.ai:8081';
// const ipfsAPI = require('ipfs-api');

const Interface = '/ai';
let myHeaders = new Headers({
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'text/plain'
});

function strToBinary(str){
  console.log(str)
  var result = [];
  var list = str.split("");
  console.log(list)
  for(var i=0;i<list.length;i++){
      var item = list[i];
      var binartStr = item.charCodeAt().toString(2);
      result.push(binartStr);
  }   
  return result
}

export const API = {
  // 获取用户信息
  getuserInfo: (address) => {
    return new Promise(function  (resolve, reject) {
      fetch(`/ai/user/${address}`, {
        method: 'GET',
      })
      .then(res => {
        return res.json()
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => resolve({}))
    })
  },
  // 注册用户信息
  postuserInfo: (data, address, sig) => {
    return new Promise(function  (resolve, reject) {
      fetch(`/ai/user/${address}?sig=${sig}`, {
        method: 'POST',
        body: data
      })
      .then(res => {
        return res.statusText
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => reject(err))
    })
  }
}

// 钱包给数据签名
export const walletSign = (address, data) => {
  let lan = window.localStorage.language || 'en'
  let json = {
    zn: '请确认操作',
    en: 'Please confirm the operation.',
    hn: '동작 확인'
  }
  return new Promise((resolve, reject) =>
    ctxWeb3.personal.sign(
      data,
      address,
      (err, signature) => {
        
          if (err) return reject(err);
          return resolve({signature });
      }
    )
  )
}
// 从签名获得recoverid
export const getRecoverid = (signature, data) => {
  let lan = window.localStorage.language || 'en'
  let json = {
    zn: '请确认操作',
    en: 'Please confirm the operation.',
    hn: '동작 확인'
  }
  return new Promise((resolve, reject) =>
  ctxWeb3.personal.ecRecover(
    data,
    signature,
      (err, recoverid) => {
          if (err) return reject(err);
          return resolve({recoverid });
      }
    )
  )
}
// 上传头像。未完成
export function uploadAvatar (file) {
  return new Promise(function(resolve, reject) {
    const descBuffer = Buffer.from(file, 'utf-8');
    ipfs.add(descBuffer).then((response) => {
      console.log(response)
      resolve(response[0].hash);
    }).catch((err) => {
      console.error(err)
      reject(err);
    })
  })
}
