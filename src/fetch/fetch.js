
// const Interface = 'http://share.cortexlabs.ai:8081';
// const ipfsAPI = require('ipfs-api');

const Interface = '/ai';
let myHeaders = new Headers({
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'text/plain'
});

export const API = {
  getuserInfo: (address) => {
    return new Promise(function  (resolve, reject) {
      fetch(`/ai/user/${address}`, {
      // fetch(`${Interface}/user/${address}`, {
        method: 'GET',
      })
      .then(res => {
        return res.json()
      })
      .then(res => {
        resolve('0x0b18c352e7fe19efea86a7e545fce0d30951af6b')
      })
      .catch(err => reject(err))
    })
  },

  postuserInfo: (data, address, sig) => {
    return new Promise(function  (resolve, reject) {
      fetch(`/ai/user/${address}?sig=${sig}`, {
      // fetch(`${Interface}/user/${address}`, {
        method: 'POST',
        body: JSON.stringify(data)
      })
      .then(res => {
        return res.json()
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
  ctxWeb3.eth.sign(
        JSON.stringify(data),
        address,
        (err, signature) => { 
           if (err) return reject(err);
           return resolve({signature });
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
